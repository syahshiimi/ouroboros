export const generator = (min: number, max: number) => {
  if (max < 0) {
    throw new Error(`Max input ${max} is less than 0`);
  } else if (min < 0) {
    throw new Error(`Min input ${max} is less than 0`);
  } else if (max < min) {
    throw new Error(
      `Max number input of ${max} is smaller than the min input value of ${min}`,
    );
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
