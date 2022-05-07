import { BoletoInfo } from '../shared/types/boleto';

export const getExpirationDate = (boletoInfoObj: BoletoInfo): string => {
  if (boletoInfoObj.expirationFactor) {
    const expirationFactor = boletoInfoObj.expirationFactor;
    const date = new Date(1997, 9, 7);
    date.setDate(date.getDate() + Number(expirationFactor));
    const monthZero = date.getMonth() + 1 < 10 ? '0' : '';
    const dayZero = date.getDate() < 10 ? '0' : '';
    const formattedDate = `${date.getFullYear()}-${monthZero}${
      date.getMonth() + 1
    }-${dayZero}${date.getDate()}`;
    return formattedDate;
  }
  return '';
};
