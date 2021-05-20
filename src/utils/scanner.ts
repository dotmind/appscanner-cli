import { execSync } from "child_process";

import { APP_ROOT_DIRECTORY_PATH } from '@app';

import { initSpinner, SpinnerStatusEnum, updateSpinnerStatus } from "@utils/spinner";
import { downloadApk } from "@utils/downloader";
import { readFile, appendFile, checkExists } from '@utils/filesystem';
import { inquirerBulkScan, inquirerSimpleScan } from "@utils/inquirer";

import frameworks from '@config/frameworks';
import chalk from "chalk";

const decodeApk = async (apkID: string, apkPath: string) => {
  // Init CLI spinner
  const spinner = initSpinner(`Starting to decompile APK ${apkPath}`);
  const outputPath = `${APP_ROOT_DIRECTORY_PATH}/apk-downloads/${apkID}`
  try {
    execSync(`apktool -r decode ${apkPath} -o ${outputPath} -f`)
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.SUCCESS,
      `APK decoded with success ${apkPath}`
    );
    return outputPath;
  } catch (error) {
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.ERROR,
      `An error occured while decoding APK ${apkPath}`
    );
  }
}

type ResultType = {
  framework: string;
  occurences?: number;
  percent: string;
  typicalFiles?: string[];
  typicalDirs?: string[];
  buildedWith?: boolean;
}

const countOccurence = (name: string, regex: string, apkDecodedPath: string, occurenceAverage?: number): ResultType => {
  if (!occurenceAverage) {
    throw 'No Occurence average defined in frameworks config'
  }
  const command = `grep -iR "${regex}" ${apkDecodedPath} | wc -w`
  const res = execSync(command).toString().trim();
  const percent = (Number(res) / occurenceAverage ) * 100;
  return {
    framework: name,
    occurences: Number(res),
    percent: percent > 100 ? '100' : percent.toFixed(0),
    buildedWith: percent > 90,
  }
}

const checkArchDirs = (name: string, apkDecodedPath: string, typicalDirs?: string[]): ResultType => {
  if (!typicalDirs) {
    throw `Cannot found typical files for ${name} framework`
  }
  const exists = typicalDirs.map((dir) => {
    return checkExists(`${apkDecodedPath}/${dir}`)
  })
  
  return {
    framework: name,
    percent: exists.includes(true) ? '100' : '0',
    buildedWith: exists.includes(true),
  }
}

const checkArchFiles = (name: string, apkDecodedPath: string, typicalFiles?: string[]): ResultType => {
  if (!typicalFiles) {
    throw `Cannot found typical files for ${name} framework`
  }
  const exists = typicalFiles.map((file) => {
    return checkExists(`${apkDecodedPath}/${file}`)
  })
  return {
    framework: name,
    percent: exists.includes(true) ? '100' : '0',
    buildedWith: exists.includes(true),
  }
}

const detectFramework = async (apkID: string, apkDecodedPath: string) => {
  // Init CLI spinner
  const spinner = initSpinner(`Starting to scan decoded APK with architecture method ${apkDecodedPath}`);
  try {
    let results: ResultType[] = [];
    frameworks.forEach(({ name, typicalFiles, typicalDirs, regex, occurenceAverage }) => {
      let result: ResultType;
      if (typicalFiles) {
        result = checkArchFiles(name, apkDecodedPath, typicalFiles);
      } else if (typicalDirs) {
        result = checkArchDirs(name, apkDecodedPath, typicalDirs);
      } else if (regex) {
        result = countOccurence(name, regex, apkDecodedPath, occurenceAverage);
      } else {
        throw 'No scanning method found for this framework';
      }
      results.push(result)
    })
    const message = results.map(({ framework, percent, buildedWith }) => (
      `${buildedWith ? chalk.green(framework) : framework}: ${percent}%`)
    ).join(' | ');
    const fullMessage = `${apkID} --> ${message}`
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.SUCCESS,
      fullMessage
    );
    return results;
  } catch (error) {
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.ERROR,
      `An error occured while scanning APK ${apkDecodedPath}`
    );
  }
}

const bulkScan = async (scanListFilePath?: string) => {
  const bulkInputFile = await inquirerBulkScan(scanListFilePath);
  if (!bulkInputFile) {
    throw 'No bulk input file detected';
  }
  const outputScanResultsFilePath = `${APP_ROOT_DIRECTORY_PATH}/.scan/results.txt`;
  const scanFileContent = await readFile(bulkInputFile, { encoding: 'utf-8'}) as string;
  const apkIDs = scanFileContent.split('\n');
  apkIDs.forEach(async (apkID) => {
    const apkPath = await downloadApk(apkID);
    if (!apkPath) {
      throw `Couldn\'t download ${apkID} APK`;
    }
    const decodedPath = await decodeApk(apkID, apkPath);
    if (!decodedPath) {
      throw `Couldn\'t decode ${apkID} APK`;
    }
    const results = await detectFramework(apkID, decodedPath);
    await appendFile(outputScanResultsFilePath, `${results}\n`);
  })
}

const simpleScan = async (argvApkID?: string) => {
  const apkID = await inquirerSimpleScan(argvApkID);
  if (!apkID) {
    throw 'No APK ID detected';
  }
  const apkPath = await downloadApk(apkID);
  if (!apkPath) {
    process.exit();
  }
  const decodedPath = await decodeApk(apkID, apkPath);
  if (!decodedPath) {
    process.exit();
  }
  return await detectFramework(apkID, decodedPath);
}

export {
  simpleScan,
  bulkScan,
}