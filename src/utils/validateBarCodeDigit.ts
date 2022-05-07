import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/shared/enums/errorMessages';
import { BoletoInfo } from '../shared/types/boleto';
import { summingAllFieldNumbers } from './validateVerificationDigits';

export const validateBarCodeDigit = (boletoInfoObj: BoletoInfo): void => {
  const { barCode, expirationFactor } = boletoInfoObj;
  if (expirationFactor) {
    const barCodeVD = barCode.slice(4, 5);
    const barCodeWithoutDigit = barCode.slice(0, 4) + barCode.slice(5, 44);
    const barCodeWithoutDigitList = barCodeWithoutDigit.split('');
    let accumulator = 0;
    let multiplier = 2;
    for (let i = barCodeWithoutDigitList.length - 1; i >= 0; i--) {
      accumulator += Number(barCodeWithoutDigitList[i]) * multiplier;
      multiplier++;
      if (multiplier == 10) multiplier = 2;
    }
    const remainderByEleven = accumulator % 11;
    let barCodeDigit: number;
    barCodeDigit = 11 - remainderByEleven;
    if (barCodeDigit >= 10 || barCodeDigit === 0) barCodeDigit = 1;

    if (barCodeDigit.toString() !== barCodeVD) {
      throw new HttpException(
        ErrorMessages.VERIFICATION_DIGIT_BAR_CODE_VALIDATION_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
  } else {
    const { barCode } = boletoInfoObj;
    const barCodeVD = barCode.slice(3, 4);
    const barCodeWithoutDigit = barCode.slice(0, 3) + barCode.slice(4, 44);
    const barCodeWithoutDigitList = barCodeWithoutDigit.split('');

    const numbersMultipliedList = barCodeWithoutDigitList.map((num, index) => {
      if (index % 2 == 0) {
        return Number(num) * 2;
      }
      return Number(num);
    });

    const sum = summingAllFieldNumbers(numbersMultipliedList);
    const remainderByTen = sum % 10;
    const dac = 10 - remainderByTen;
    if (dac.toString() !== barCodeVD) {
      throw new HttpException(
        ErrorMessages.VERIFICATION_DIGIT_BAR_CODE_VALIDATION_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
};
