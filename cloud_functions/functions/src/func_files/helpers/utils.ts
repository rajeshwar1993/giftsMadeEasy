export const createDateString = (ds: string): string => {
  let thatDate = ds;
  thatDate = thatDate.split('T')[0];

  const [, m, d] = thatDate.split('-');
  const dateString = `${m}-${d}`;

  return dateString;
};
