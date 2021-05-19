import inquirer from 'inquirer';
import path from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { scanApp, decodeApk } from './src/utils/scanner';
import { downloadApk } from "./src/utils/downloader";
import { readFile, appendFile } from './src/utils/filesystem';

export const APP_ROOT_DIRECTORY_PATH = path.resolve(__dirname);

const argv = yargs(hideBin(process.argv)).argv

const bulkScan = async (scanListFilePath: string) => {
  const outputScanResultsFilePath = `${APP_ROOT_DIRECTORY_PATH}/.scan/results.txt`;
  const scanFileContent = await readFile(scanListFilePath, { encoding: 'utf-8'}) as string;
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
    const results = await scanApp(apkID, decodedPath);
    await appendFile(outputScanResultsFilePath, `${results}\n`);
  })
}

const simpleScan = async (argvApkID?: string) => {
  let apkID: string;
  if (!argvApkID) {
    const {
      apkIDprompted
    } = await inquirer.prompt([
      {
        message: 'Enter APK ID',
        name: 'apkIDprompted',
        type: 'input',
      }
    ]);
    apkID = apkIDprompted;
  } else {
    apkID = argv.apkID as string;
  }
  
  const apkPath = await downloadApk(apkID);
  if (!apkPath) {
    process.exit();
  }
  const decodedPath = await decodeApk(apkID, apkPath);
  if (!decodedPath) {
    process.exit();
  }
  await scanApp(apkID, decodedPath);
}

const init = async () => {
  if (argv.scanListFile) {
    bulkScan(argv.scanListFile as string)
  }
  if (argv.apkID) {
    simpleScan(argv.apkID as string)
  }
}

init();