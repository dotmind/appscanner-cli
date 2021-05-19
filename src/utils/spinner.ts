import ora from 'ora';

enum SpinnerStatusEnum {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const initSpinner = (message: string) => {
  return ora(message).start();
};

const updateSpinnerMessage = (spinner: ora.Ora, newMessage: string) => {
  return (spinner.text = newMessage);
};

const updateSpinnerColor = (spinner: ora.Ora, status: SpinnerStatusEnum) => {
  let newColor: ora.Color = 'white';
  switch (status) {
    case SpinnerStatusEnum.ERROR:
      newColor = 'red';
      break;
    case SpinnerStatusEnum.SUCCESS:
      newColor = 'green';
      break;

    default:
      break;
  }
  return (spinner.color = newColor);
};

const updateSpinnerStatus = (
  spinner: ora.Ora,
  status: SpinnerStatusEnum,
  message?: string
) => {
  switch (status) {
    case SpinnerStatusEnum.ERROR:
      return spinner.fail(message);
    case SpinnerStatusEnum.SUCCESS:
      return spinner.succeed(message);

    default:
      return;
  }
};

export {
  SpinnerStatusEnum,
  initSpinner,
  updateSpinnerMessage,
  updateSpinnerColor,
  updateSpinnerStatus,
};