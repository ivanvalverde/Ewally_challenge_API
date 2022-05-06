import { HttpException, HttpStatus } from '@nestjs/common';
import { BoletoNumbers } from '../types/boleto';

export const validateVerificationDigits = (nums: BoletoNumbers): void => {
  const numbersList = nums.codeToValidate.split('');
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
    verificationDigits[0] !== Number(nums.firstVerificationDigit) ||
    verificationDigits[1] !== Number(nums.secondVerificationDigit) ||
    verificationDigits[2] !== Number(nums.thirdVerificationDigit)
  ) {
    throw new HttpException(
      "The verification digits' validation was unsucessful.",
      HttpStatus.BAD_REQUEST,
    );
  }
};

const summingAllFieldNumbers = (numsList: number[]): number => {
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
