import { HttpException, HttpStatus } from '@nestjs/common';

export const validateNumbersOnlyAndLength = (request: string): void => {
  const onlyNumbers = /^[0-9]*$/;
  if (!onlyNumbers.test(request)) {
    throw new HttpException(
      'Given digitable line must be numeric.',
      HttpStatus.BAD_REQUEST,
    );
  }

  if (request.length !== 47 && request.length !== 48) {
    throw new HttpException(
      'Given digitable line must have correct length.',
      HttpStatus.BAD_REQUEST,
    );
  }
};
