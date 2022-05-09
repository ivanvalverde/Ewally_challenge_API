import { Injectable } from '@nestjs/common';
import { Boleto } from '../../models/boleto.model';
import { ValidationUtils } from '../../utils/validationUtils';

@Injectable()
export class BoletosService {
  private readonly validationUtils: ValidationUtils;
  constructor(validationUtils: ValidationUtils) {
    this.validationUtils = validationUtils;
  }
  getBoletoByDigitableLine(digitableLine: string): Boleto {
    this.validationUtils.validateNumbersOnlyAndLength(digitableLine);
    const boletoInfoObj =
      this.validationUtils.getBoletoInformations(digitableLine);
    const { barCode } = boletoInfoObj;
    const isTitleDocument = !!boletoInfoObj.expirationFactor;
    this.validationUtils.validateBarCodeDigit(boletoInfoObj);
    this.validationUtils.validateVerificationDigits(boletoInfoObj);
    const expirationDate =
      this.validationUtils.getExpirationDate(boletoInfoObj);
    const amount = this.validationUtils.getAmount(boletoInfoObj);
    const expirationDateObj = isTitleDocument ? { expirationDate } : {};

    return {
      amount,
      barCode,
      ...expirationDateObj,
    };
  }
}
