export const getCurrentDate = () => {
  // We set a user offset of +8 as the serverless function runs on a UTC+0 offset
  const userOffset = 8

  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const adjustedDate = new Date(now.getTime() - offsetMinutes * 60000 + userOffset);
  return adjustedDate.toISOString().split(".")[0];
};
