import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";

/**
 * A timer hook that returns the current date and time.
 */
export const useTimerHook = () => {
  const [currentDate, setCurrentDate] = useState(() => formatDate(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = formatDate(new Date());
      setCurrentDate(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentDate;
};
