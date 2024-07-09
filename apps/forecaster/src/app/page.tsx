"use client";

import SG from "../../public/sg_2.svg";
import { HumidityText } from "../../public/text/humidity.text";
import { useTimerHook } from "@/hooks/useTimerHook";

export default function Home() {
  const date = useTimerHook();

  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4 z-20`}>
        <h1 className={`text-h2 text-white`}>Humidity Forecast</h1>
        <h2 className={`text-body text-white`}>{date}</h2>
      </section>
      <section className={`flex-grow flex items-center justify-center z-[-99`}>
        <SG className={`fixed bg-blue-300 max-h-[54rem]`} />
      </section>
      <section className={`text-menu-t text-white`}>
        <p className={`fixed left-[27%] bottom-[50%] text-nowrap`}>Sticky.</p>
        <p className={`fixed right-[30%] bottom-[48%] text-nowrap`}>Sticky.</p>
      </section>
      <section className={`w-full z-20`}>
        <h2 className={`text-menu-t text-center pb-4 text-green-200`}>
          {HumidityText[2]}
        </h2>
      </section>
    </main>
  );
}
