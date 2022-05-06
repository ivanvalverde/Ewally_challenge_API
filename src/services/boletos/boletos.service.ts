import { Injectable } from '@nestjs/common';
import { boletoCleaner } from '../../utils/boletoCleaner';
import { getExpirationDate } from '../../utils/getExpirationDate';
import { Boleto } from '../../models/boleto.model';
import { getAmount } from '../../utils/getAmount';
import { barCodeGenerator } from '../../utils/barCodeGenerator';
import { validateVerificationDigits } from '../../utils/validateVerificationDigits';
import { validateNumbersOnlyAndLength } from 'src/utils/validateNumbersOnlyAndLength';

@Injectable()
export class BoletosService {
  getBoletoByNumber(id: string): Boleto {
    validateNumbersOnlyAndLength(id);
    const boletoNumbers = boletoCleaner(id);
    validateVerificationDigits(boletoNumbers);
    const expirationDate = getExpirationDate(boletoNumbers?.expirationFactor);
    const amount = getAmount(boletoNumbers?.boletoAmount);
    const barCode = barCodeGenerator(boletoNumbers);
    return {
      amount: amount,
      barCode: barCode,
      expirationDate: expirationDate,
    };
  }
}
