import { BoletoInfo } from '../shared/types/boleto';

export const getAmount = (boletoInfoObj: BoletoInfo): string => {
  const amount = boletoInfoObj.boletoAmount;
  let reais: string;
  let cents: string;

  if (boletoInfoObj.expirationFactor) {
    reais = amount.slice(0, 8);
    cents = amount.slice(8);
  } else {
    reais = amount.slice(0, 9);
    cents = amount.slice(9);
  }

  return `${Number(reais)}.${cents}`;
};
