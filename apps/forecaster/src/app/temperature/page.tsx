"use client";

import SG from "../../../public/sg_2.svg";
import { getTemperatureText } from "@/utils/topics/getTemperature";
import DateComponent from "@/components/date";

export default function Home() {
  // TODO: Fetch the temperature data by creating the /api route.
  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4 z-20`}>
        <h1 className={`text-h2 text-white`}>Temperature Forecast</h1>
        <DateComponent />
      </section>
      <section
        className={`flex-grow flex text-menu-t items-center justify-center text-white z-[-99`}
      >
        <div className={`h-fit w-fit relative`}>
          <SG className={`bg-blue-300 min-h-[58rem]`} />
          <p className={`absolute bottom-[49%] left-[12%] text-nowrap`}>
            Sticky
          </p>
          <p className={`absolute right-[15%] bottom-[52%] text-nowrap`}>
            Sticky
          </p>
        </div>
      </section>
      <section className={`w-full z-20`}>
        <h2 className={`text-menu-t text-center pb-4 text-green-200`}>
          {getTemperatureText(27)}
        </h2>
      </section>
    </main>
  );
}
