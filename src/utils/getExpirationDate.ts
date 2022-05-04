export const getExpirationDate = (nums: string): string => {
  const date = new Date(1997, 9, 7);
  date.setDate(date.getDate() + Number(nums));
  const monthZero = date.getMonth() + 1 < 10 ? '0' : '';
  const dayZero = date.getDate() < 10 ? '0' : '';
  const formattedDate = `${date.getFullYear()}-${monthZero}${
    date.getMonth() + 1
  }-${dayZero}${date.getDate()}`;
  return formattedDate;
};
