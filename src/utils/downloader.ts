import { execSync } from 'child_process';

import { APP_ROOT_DIRECTORY_PATH } from '@app';

import { initSpinner, SpinnerStatusEnum, updateSpinnerStatus } from '@utils/spinner';

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