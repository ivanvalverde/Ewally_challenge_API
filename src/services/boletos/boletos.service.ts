import { Injectable } from '@nestjs/common';
import { boletoCleaner } from '../../utils/boletoCleaner';
import { getExpirationDate } from '../../utils/getExpirationDate';
import { Boleto } from '../../models/boleto.model';
import { getAmount } from '../../utils/getAmount';

@Injectable()
export class BoletosService {
  getBoletoByNumber(id: string): Boleto {
    const boletoNumbers = boletoCleaner(id);
    const expirationDate = getExpirationDate(boletoNumbers?.expirationFactor);
    const amount = getAmount(boletoNumbers?.boletoAmount);
    return {
      amount: amount,
      barCode: '',
      expirationDate: expirationDate,
    };
  }
}
