import path from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { inquirerRoot, ArgvType } from './src/utils/inquirer';

export const APP_ROOT_DIRECTORY_PATH = path.resolve(__dirname);

const argv = yargs(hideBin(process.argv)).argv as ArgvType;

const init = async () => {
  await inquirerRoot(argv);
}

init();