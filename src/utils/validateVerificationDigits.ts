import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/shared/enums/errorMessages';
import { BoletoInfo } from '../shared/types/boleto';

export const validateVerificationDigits = (boletoInfoObj: BoletoInfo): void => {
  if (boletoInfoObj.expirationFactor) {
    const numbersList = boletoInfoObj.codeToValidate.split('');
    const numbersMultipliedList = numbersList.map((num, index) => {
      if (index % 2 == 0) {
        return Number(num) * 2;
      }
      return Number(num);
    });
    const fieldOneNumbers = numbersMultipliedList.slice(0, 9);
    const fieldTwoNumbers = numbersMultipliedList.slice(9, 19);
    const fieldThreeNumbers = numbersMultipliedList.slice(19, 29);

    const sums = [
      summingAllFieldNumbers(fieldOneNumbers),
      summingAllFieldNumbers(fieldTwoNumbers),
      summingAllFieldNumbers(fieldThreeNumbers),
    ];

    const remainderByTen = sums.map((sum) => sum % 10);
    const verificationDigits = remainderByTen.map((num) => 10 - num);
    if (
      verificationDigits[0] !== Number(boletoInfoObj.firstVerificationDigit) ||
      verificationDigits[1] !== Number(boletoInfoObj.secondVerificationDigit) ||
      verificationDigits[2] !== Number(boletoInfoObj.thirdVerificationDigit)
    ) {
      throw new HttpException(
        ErrorMessages.VERIFICATION_DIGITS_VALIDATION_FAILED,
        HttpStatus.BAD_REQUEST,
      );
    }
  } else {
    const {
      barCode,
      firstVerificationDigit,
      secondVerificationDigit,
      thirdVerificationDigit,
      fourthVerificationDigit,
    } = boletoInfoObj;
    const fieldsToValidateList = [
      { field: barCode.slice(0, 11), vd: firstVerificationDigit },
      { field: barCode.slice(11, 22), vd: secondVerificationDigit },
      { field: barCode.slice(22, 33), vd: thirdVerificationDigit },
      { field: barCode.slice(33, 44), vd: fourthVerificationDigit },
    ];
    const fieldsToValidate = fieldsToValidateList.map((current) => ({
      field: current.field.split(''),
      vd: current.vd,
    }));
    fieldsToValidate.forEach((current) => {
      const numbersMultipliedList = current.field.map((num, index) => {
        if (index % 2 == 0) {
          return Number(num) * 2;
        }
        return Number(num);
      });

      const sum = summingAllFieldNumbers(numbersMultipliedList);
      const remainderByTen = sum % 10;
      let dac = 10 - remainderByTen;
      if (dac >= 10 || dac === 0) dac = 0;

      if (dac.toString() !== current.vd) {
        throw new HttpException(
          ErrorMessages.VERIFICATION_DIGITS_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
};

export const summingAllFieldNumbers = (numsList: number[]): number => {
  return numsList.reduce((acc, current) => {
    if (current.toString().length > 1) {
      return (
        acc +
        current
          .toString()
          .split('')
          .reduce((acc2, current2) => {
            acc2 = acc2 + Number(current2);
            return acc2;
          }, 0)
      );
    }
    return acc + current;
  }, 0);
};

const getDAC = (nums: string): number => {
  const numbersList = nums.split('');
  const numbersMultipliedList = numbersList.map((num, index) => {
    if (index % 2 == 0) {
      return Number(num) * 2;
    }
    return Number(num);
  });
  const remainderByTen = summingAllFieldNumbers(numbersMultipliedList) % 10;
  const DAC = 10 - remainderByTen;
  return DAC;
};
