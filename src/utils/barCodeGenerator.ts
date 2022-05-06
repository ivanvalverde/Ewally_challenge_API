import { BoletoNumbers } from '../types/boleto';

export const barCodeGenerator = (nums: BoletoNumbers): string => {
  const barCode =
    nums.recipientInstitution +
    nums.currencyCode +
    nums.barCodeDigit +
    nums.expirationFactor +
    nums.boletoAmount +
    nums.twentyToTwentyFourBarCode +
    nums.twentyFiveToThirtyFourBarCode +
    nums.thirtyFiveToFortyFourBarCode;
  return barCode;
};
