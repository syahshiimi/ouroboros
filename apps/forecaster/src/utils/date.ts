export const getCurrentDate = () => {
  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const adjustedDate = new Date(now.getTime() - offsetMinutes * 60000);
  return adjustedDate.toISOString().split(".")[0];
};
