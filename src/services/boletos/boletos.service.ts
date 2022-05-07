import { Injectable } from '@nestjs/common';
import { getBoletoInformations } from '../../utils/getBoletoInformations';
import { getExpirationDate } from '../../utils/getExpirationDate';
import { Boleto } from '../../models/boleto.model';
import { getAmount } from '../../utils/getAmount';
import { validateVerificationDigits } from '../../utils/validateVerificationDigits';
import { validateNumbersOnlyAndLength } from '../../utils/validateNumbersOnlyAndLength';
import { validateBarCodeDigit } from '../../utils/validateBarCodeDigit';

@Injectable()
export class BoletosService {
  getBoletoByDigitableLine(digitableLine: string): Boleto {
    validateNumbersOnlyAndLength(digitableLine);
    const boletoInfoObj = getBoletoInformations(digitableLine);
    const { barCode } = boletoInfoObj;
    const isTitleDocument = !!boletoInfoObj.expirationFactor;
    validateBarCodeDigit(boletoInfoObj);
    validateVerificationDigits(boletoInfoObj);
    const expirationDate = getExpirationDate(boletoInfoObj);
    const amount = getAmount(boletoInfoObj);
    const expirationDateObj = isTitleDocument ? { expirationDate } : {};

    return {
      amount,
      barCode,
      ...expirationDateObj,
    };
  }
}
