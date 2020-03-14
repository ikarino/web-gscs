export const sum = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return arr.reduce((prev, current) => {
    return prev + current;
  });
};

export const mean = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0;
  }
  return sum(arr) / arr.length;
};

export const std = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0;
  }
  const m: number = mean(arr);
  const variance =
    arr
      .map(current => (current - m) ** 2)
      .reduce((prev, current) => {
        return prev + current;
      }) / arr.length;
  return Math.sqrt(variance);
};

export const epochTimeToString = (createdAt: number): string => {
  const date = new Date(createdAt);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
};
