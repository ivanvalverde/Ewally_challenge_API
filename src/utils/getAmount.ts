export const getAmount = (nums: string): string => {
  const reais = nums.slice(0, 8);
  const cents = nums.slice(8);
  return `${Number(reais)}.${cents}`;
};
