import { BoletoNumbers } from '../types/boleto';

export const boletoCleaner = (fullNumber: string): BoletoNumbers => {
  if (fullNumber.length === 47) {
    return {
      recipientInstitution: fullNumber.slice(0, 3),
      currencyCode: fullNumber.slice(3, 4),
      twentyToTwentyFourBarCode: fullNumber.slice(4, 9),
      firstVerificationDigit: fullNumber.slice(9, 10),
      twentyFiveToThirtyFourBarCode: fullNumber.slice(10, 20),
      secondVerificationDigit: fullNumber.slice(20, 21),
      thirtyFiveToFortyFourBarCode: fullNumber.slice(21, 31),
      thirdVerificationDigit: fullNumber.slice(31, 32),
      barCodeDigit: fullNumber.slice(32, 33),
      expirationFactor: fullNumber.slice(33, 37),
      boletoAmount: fullNumber.slice(37, 48),
      codeToValidate:
        fullNumber.slice(0, 3) +
        fullNumber.slice(3, 4) +
        fullNumber.slice(4, 9) +
        fullNumber.slice(10, 20) +
        fullNumber.slice(21, 31),
    };
  }

  return {
    boletoAmount: fullNumber.slice(4, 15),
  };
};
