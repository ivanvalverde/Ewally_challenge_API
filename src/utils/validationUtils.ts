import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessages } from '../shared/enums/errorMessages';
import { BoletoInfo } from '../shared/types/boleto';

@Injectable()
export class ValidationUtils {
  validateVerificationDigits = (boletoInfoObj: BoletoInfo): void => {
    if (boletoInfoObj.expirationFactor) {
      const numbersList = boletoInfoObj.codeToValidate.split('');
      const numbersMultipliedList = this.getMultipliedList(numbersList);

      const fieldOneNumbers = numbersMultipliedList.slice(0, 9);
      const fieldTwoNumbers = numbersMultipliedList.slice(9, 19);
      const fieldThreeNumbers = numbersMultipliedList.slice(19, 29);

      const sums = [
        this.summingAllFieldNumbers(fieldOneNumbers),
        this.summingAllFieldNumbers(fieldTwoNumbers),
        this.summingAllFieldNumbers(fieldThreeNumbers),
      ];

      const remainderByTen = sums.map((sum) => sum % 10);
      const verificationDigits = remainderByTen.map((num) => 10 - num);
      if (
        verificationDigits[0] !==
          Number(boletoInfoObj.firstVerificationDigit) ||
        verificationDigits[1] !==
          Number(boletoInfoObj.secondVerificationDigit) ||
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
        const numbersMultipliedList = this.getMultipliedList(current.field);

        const sum = this.summingAllFieldNumbers(numbersMultipliedList);
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

  validateBarCodeDigit = (boletoInfoObj: BoletoInfo): void => {
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

      const numbersMultipliedList = barCodeWithoutDigitList.map(
        (num, index) => {
          if (index % 2 == 0) {
            return Number(num) * 2;
          }
          return Number(num);
        },
      );

      const sum = this.summingAllFieldNumbers(numbersMultipliedList);
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

  validateNumbersOnlyAndLength = (digitableLine: string): void => {
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

  summingAllFieldNumbers = (numsList: number[]): number => {
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

  getMultipliedList = (numbersList: string[]): number[] => {
    return numbersList.map((num, index) => {
      if (index % 2 == 0) {
        return Number(num) * 2;
      }
      return Number(num);
    });
  };

  getBoletoInformations = (digitableLine: string): BoletoInfo => {
    if (digitableLine.length === 47) {
      return {
        recipientInstitution: digitableLine.slice(0, 3),
        currencyCode: digitableLine.slice(3, 4),
        firstVerificationDigit: digitableLine.slice(9, 10),
        secondVerificationDigit: digitableLine.slice(20, 21),
        thirdVerificationDigit: digitableLine.slice(31, 32),
        expirationFactor: digitableLine.slice(33, 37),
        boletoAmount: digitableLine.slice(37, 48),
        codeToValidate:
          digitableLine.slice(0, 3) +
          digitableLine.slice(3, 4) +
          digitableLine.slice(4, 9) +
          digitableLine.slice(10, 20) +
          digitableLine.slice(21, 31),
        barCode:
          digitableLine.slice(0, 3) +
          digitableLine.slice(3, 4) +
          digitableLine.slice(32, 33) +
          digitableLine.slice(33, 37) +
          digitableLine.slice(37, 48) +
          digitableLine.slice(4, 9) +
          digitableLine.slice(10, 20) +
          digitableLine.slice(21, 31),
      };
    }

    return {
      boletoAmount: digitableLine.slice(4, 11) + digitableLine.slice(12, 16),
      currencyCode: digitableLine.slice(2, 3),
      firstVerificationDigit: digitableLine.slice(11, 12),
      secondVerificationDigit: digitableLine.slice(23, 24),
      thirdVerificationDigit: digitableLine.slice(35, 36),
      fourthVerificationDigit: digitableLine.slice(47, 48),
      barCode:
        digitableLine.slice(0, 11) +
        digitableLine.slice(12, 23) +
        digitableLine.slice(24, 35) +
        digitableLine.slice(36, 47),
    };
  };

  getExpirationDate = (boletoInfoObj: BoletoInfo): string => {
    if (boletoInfoObj.expirationFactor) {
      const expirationFactor = boletoInfoObj.expirationFactor;
      const date = new Date(1997, 9, 7);
      date.setDate(date.getDate() + Number(expirationFactor));
      const monthZero = date.getMonth() + 1 < 10 ? '0' : '';
      const dayZero = date.getDate() < 10 ? '0' : '';
      const formattedDate = `${date.getFullYear()}-${monthZero}${
        date.getMonth() + 1
      }-${dayZero}${date.getDate()}`;
      return formattedDate;
    }
    return '';
  };

  getAmount = (boletoInfoObj: BoletoInfo): string => {
    const amount = boletoInfoObj.boletoAmount;
    let reais: string;
    let cents: string;

    if (boletoInfoObj.expirationFactor) {
      reais = amount.slice(0, 8);
      cents = amount.slice(8);
    } else {
      reais = amount.slice(0, 9);
      cents = amount.slice(9);
    }

    return `${Number(reais)}.${cents}`;
  };
}
