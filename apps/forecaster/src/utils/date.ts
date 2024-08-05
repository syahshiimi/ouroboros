export const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0] ?? "2024-03-04";
};
