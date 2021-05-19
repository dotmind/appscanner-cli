import { execSync } from "child_process";

import { APP_ROOT_DIRECTORY_PATH } from "../../index";
import { initSpinner, SpinnerStatusEnum, updateSpinnerStatus } from "./spinner";

import frameworks from '../config/frameworks.json';
import { checkExists } from "./filesystem";

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
  }
}

const checkArchDirs = (name: string, apkDecodedPath: string, typicalDirs?: string[]): ResultType => {
  if (!typicalDirs) {
    throw `Cannot found typical files for ${name} framework`
  }
  const exists = checkExists(`${apkDecodedPath}/${typicalDirs[0]}`)
  return {
    framework: name,
    percent: exists ? '100' : '0',
  }
}

const checkArchFiles = (name: string, apkDecodedPath: string, typicalFiles?: string[]): ResultType => {
  if (!typicalFiles) {
    throw `Cannot found typical files for ${name} framework`
  }
  const exists = checkExists(`${apkDecodedPath}/${typicalFiles[0]}`)
  return {
    framework: name,
    percent: exists ? '100' : '0',
  }
}

const scanApp = async (apkID: string, apkDecodedPath: string) => {
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
      } else {
        result = countOccurence(name, regex, apkDecodedPath, occurenceAverage);
      }
      results.push(result)
    })
    const message = results.map(({ framework, percent }) => `${framework}: ${percent}%`).join(' | ');
    const fullMessage = `${apkID} --> ${message}`
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.SUCCESS,
      fullMessage
    );
    return fullMessage;
  } catch (error) {
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.ERROR,
      `An error occured while scanning APK ${apkDecodedPath}`
    );
  }
}

export {
  decodeApk,
  scanApp,
}