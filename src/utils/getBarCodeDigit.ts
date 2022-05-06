export const getBarCodeDigit = (barCodeWithoutDigit: string): string => {
  const barCodeWithoutDigitList = barCodeWithoutDigit.split('');
  let accumulator = 0;
  let multiplier = 2;
  for (let i = barCodeWithoutDigitList.length - 1; i >= 0; i--) {
    accumulator += Number(barCodeWithoutDigitList[i]) * multiplier;
    multiplier++;
    if (multiplier == 10) multiplier = 2;
  }
  const remainderByEleven = accumulator % 11;
  let barCodeDigit: number;
  barCodeDigit = 11 - remainderByEleven;
  if (barCodeDigit >= 10 || barCodeDigit === 0) barCodeDigit = 1;

  return barCodeDigit.toString();
};
