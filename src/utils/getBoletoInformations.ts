import { BoletoInfo } from '../shared/types/boleto';

export const getBoletoInformations = (digitableLine: string): BoletoInfo => {
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
