import inquirer from "inquirer";
import { Arguments } from "yargs";

import { bulkScan, simpleScan } from "@utils/scanner";

export type ArgvType = Arguments<{
  scanListFile?: string;
  apkID?: string;
}>

const inquirerRoot = async (argv: ArgvType) => {
  const {
    choice
  } = await inquirer.prompt([
    {
      message: 'What do you want to do ?',
      name: 'choice',
      type: 'list',
      choices: [
        {
          name: 'Detect app framework',
          value: 'framework',
        },
        {
          name: 'Scan vulnerabilities',
          value: 'vulnerabilities',
        },
      ]
    }
  ]);
  if (choice === 'framework') {
    inquirerScan(argv);
  }
}

const inquirerScan = async (argv: ArgvType) => {
  const {
    scanType
  } = await inquirer.prompt([
    {
      message: 'Choose a scan type',
      name: 'scanType',
      type: 'list',
      choices: ['simple', 'bulk']
    }
  ]);
  if (scanType === 'simple') {
    simpleScan(argv.apkID);
  }
  if (scanType === 'bulk') {
    bulkScan(argv.scanListFile)
  }
}

const inquirerSimpleScan = async (argvApkID?: string) => {
  let apkID = argvApkID;
  if (!apkID) {
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
    throw 'No APK ID detected'
  }
  return apkID;
}

const inquirerBulkScan = async (argvBulkInputFile?: string) => {
  let bulkInputFile = argvBulkInputFile;
  if (!bulkInputFile) {
    const {
      bulkFilePrompted
    } = await inquirer.prompt([
      {
        message: 'Enter Bulk Input File',
        name: 'apkIDprompted',
        type: 'input',
      }
    ]);
    bulkInputFile = bulkFilePrompted;
    throw 'No bulk input file found'
  }
  return bulkInputFile;
}

export { inquirerRoot, inquirerScan, inquirerBulkScan, inquirerSimpleScan }