import { Boleto } from '../../models/boleto.model';
import { BoletoInfo } from '../types/boleto';

export const mockTitleDocumentDigitableLine =
  '21290001192110001210904475617405975870000002000';

export const mockConventionDocumentDigitableLine =
  '817700000000010936599702411310797039001433708318';

export const mockTitleDocumentAmount = '20.00';

export const mockConventionDocumentAmount = '1.09';

export const mockExpirationDate = '2018-07-16';

export const mockBarCodeTitleDocument =
  '21299758700000020000001121100012100447561740';

export const mockBarCodeConventionDocument =
  '81770000000010936599704113107970300143370831';

export const mockControllerResponse: Boleto = {
  amount: mockTitleDocumentAmount,
  barCode: mockBarCodeTitleDocument,
  expirationDate: mockExpirationDate,
};

export const mockServiceTitleDocumentResponse: Boleto = mockControllerResponse;

export const mockServiceConventionDocumentResponse: Boleto = {
  amount: mockConventionDocumentAmount,
  barCode: mockBarCodeConventionDocument,
};

export const mockTitleboletoInfoObj: BoletoInfo = {
  barCode: mockBarCodeTitleDocument,
  boletoAmount: '0000002000',
  currencyCode: '9',
  firstVerificationDigit: '9',
  secondVerificationDigit: '9',
  thirdVerificationDigit: '5',
  codeToValidate: '21290001121100012100447561740',
  expirationFactor: '7587',
  recipientInstitution: '212',
};

export const mockConventionboletoInfoObj: BoletoInfo = {
  barCode: mockBarCodeConventionDocument,
  boletoAmount: '00000000109',
  currencyCode: '7',
  firstVerificationDigit: '0',
  secondVerificationDigit: '2',
  thirdVerificationDigit: '9',
  fourthVerificationDigit: '8',
};

export const mockDigitableLineWithLetters =
  '12345678901234567890abcd678901234567890123456ab';

export const mockDigitableLineIncorrectLength = '123456789';

export const mockNumbersListToSum = [1, 23, 45, 6, 7];

export const mockListSum = 1 + 2 + 3 + 4 + 5 + 6 + 7;

export const mockListToMultiply = ['1', '1', '1', '1', '1'];

export const mockMultipliedList = [2, 1, 2, 1, 2];

export const mockWrongTitleboletoInfoObj: BoletoInfo = {
  barCode: '21292258718295620000001127300012117447561280',
  boletoAmount: '0000002000',
  currencyCode: '9',
  firstVerificationDigit: '9',
  secondVerificationDigit: '9',
  thirdVerificationDigit: '5',
  codeToValidate: '21264538201100012100447561740',
  expirationFactor: '7587',
  recipientInstitution: '212',
};

export const mockWrongConventionboletoInfoObj: BoletoInfo = {
  barCode: '81771234567810936599704113107970300143370831',
  boletoAmount: '00000000109',
  currencyCode: '7',
  firstVerificationDigit: '0',
  secondVerificationDigit: '2',
  thirdVerificationDigit: '9',
  fourthVerificationDigit: '8',
};

export const mockWrongTitleDocumentDigitableLine =
  '21212311933300012109044756174023458700000020005';

export const mockWrongConventionDocumentDigitableLine =
  '817700000004010936599702411310797039001433708318';
