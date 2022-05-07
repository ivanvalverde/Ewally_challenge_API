import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/shared/enums/errorMessages';

export const validateNumbersOnlyAndLength = (digitableLine: string): void => {
  const onlyNumbers = /^[0-9]*$/;
  if (!onlyNumbers.test(digitableLine)) {
    throw new HttpException(
      ErrorMessages.NOT_NUMERIC_ERROR_MESSAGE,
      HttpStatus.BAD_REQUEST,
    );
  }

  if (digitableLine.length !== 47 && digitableLine.length !== 48) {
    throw new HttpException(
      ErrorMessages.INCORRECT_LENGTH_MESSAGE,
      HttpStatus.BAD_REQUEST,
    );
  }
};
