import { execSync } from 'child_process';
import { APP_ROOT_DIRECTORY_PATH } from '../../index';
import { initSpinner, SpinnerStatusEnum, updateSpinnerStatus } from './spinner';

const downloadApk = async (apkID: string) => {
  // Init CLI spinner
  const spinner = initSpinner(`Starting to download APK ${apkID}`);
  const outputFile = `${APP_ROOT_DIRECTORY_PATH}/apk-downloads/${apkID}.apk`;
  try {
    execSync(`gplaydl download --packageId ${apkID} --path ./apk-downloads/ --splits n`)
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.SUCCESS,
      `APK downloaded with success ${outputFile}`
    );
    return outputFile;
  } catch (error) {
    updateSpinnerStatus(
      spinner,
      SpinnerStatusEnum.ERROR,
      `An error occured while downloading APK ${apkID}`
    );
  }
}

export {
  downloadApk,
}