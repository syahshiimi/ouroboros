export const getCurrentDate = () => {
  return new Date().toISOString().split(".")[0] ?? "";
};
