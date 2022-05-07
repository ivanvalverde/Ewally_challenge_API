export type BoletoInfo = {
  expirationFactor?: string;
  recipientInstitution?: string;
  currencyCode: string;
  boletoAmount: string;
  codeToValidate?: string;
  firstVerificationDigit: string;
  secondVerificationDigit: string;
  thirdVerificationDigit: string;
  fourthVerificationDigit?: string;
  barCode: string;
};
