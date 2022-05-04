import { BoletoNumbers } from '../types/boleto';

export const boletoCleaner = (fullNumber: string): BoletoNumbers => {
  const recipientInstitution = fullNumber.slice(0, 3);
  const currencyCode = fullNumber.slice(3, 4);
  const twentyToTwentyFourBarCode = fullNumber.slice(4, 9);
  const expirationFactor = fullNumber.slice(33, 37);
  const boletoAmount = fullNumber.slice(37, 48);

  return {
    expirationFactor,
    recipientInstitution,
    currencyCode,
    twentyToTwentyFourBarCode,
    boletoAmount,
  };
};
