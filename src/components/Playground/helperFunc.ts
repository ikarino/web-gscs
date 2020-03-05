export const place2index = (
  p: { col: number; row: number },
  col: number
): number => {
  return col * p.row + p.col;
};
