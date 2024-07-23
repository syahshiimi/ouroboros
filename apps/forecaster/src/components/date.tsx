"use client";

import { useTimerHook } from "@/hooks/useTimerHook";

export default function DateComponent() {
  const date = useTimerHook();
  return (
    <>
      <h2 className={`text-body text-white`}>{date}</h2>;
    </>
  );
}
