export const getOneMonthBefore = (YYYYMM: string) => {
  const YYYY = YYYYMM.slice(0, 4);
  const MM = YYYYMM.slice(4, 6);
  if (Number(MM) - 1 === 0) {
    return (Number(YYYY) - 1).toString() + '12';
  } else {
    return YYYY + (Number(MM) - 1).toString();
  }
};
