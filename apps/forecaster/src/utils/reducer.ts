export const reducer = (data: any[]) => {
  const sum = data.reduce(
    (acc: number, curr: { value: number }) => acc + curr.value,
    0,
  );
  const length = data.length;
  return sum / length;
};
