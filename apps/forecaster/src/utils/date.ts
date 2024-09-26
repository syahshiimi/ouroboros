export const getCurrentDate = () => {
  const now = new Date();
  const milisecondsPerMinute = 60 * 1000
  const milisecondsPerHour = 60 * 60 * 1000

  // Convert local time to UTC by adding tz offset.
  const utc = now.getTime() + (now.getTimezoneOffset() * milisecondsPerMinute);

  // Desired offset of Asia/Singapore which is UTC+8.
  const offsetHours = 8;

  // Add the 8 hours as miliseconds to offsetHours
  const adjustedDate = new Date(utc + (milisecondsPerHour* offsetHours));
  return adjustedDate.toISOString().split(".")[0];
};
