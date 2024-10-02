"use client";

import { useTimerHook } from "@/hooks/useTimerHook";

export default function DateComponent() {
  const date = useTimerHook();
  return (
    <>
      <h2 className={`text-minor text-white pt-2`}>{date}</h2>;
    </>
  );
}
