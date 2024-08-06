"use client";

import SG from "../../../public/sg_2.svg";
import { HumidityText } from "../../../public/text/humidity.text";
import { useTimerHook } from "@/hooks/useTimerHook";
import DateComponent from "@/components/date";
import { getTemperatureText } from "@/utils/topics/getTemperature";
import { useDataHook } from "@/hooks/useDataHook";
import { reducer } from "@/utils/reducer";
import { getRainfall } from "@/utils/topics/getRainfall";
import { Status } from "@/components/status";
import { getCurrentDate } from "@/utils/date";

export default function Rainfall() {
  const date = getCurrentDate();
  const { data, isLoading, isError } = useDataHook("rainfall", date);

  if (isLoading) return <p>Retrieving new details</p>;
  if (isError) return <p>Error fetching data</p>;

  const averageRainfall = parseFloat(
    reducer(data.data.data.readings[0].data).toFixed(1),
  );

  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4 z-20`}>
        <h1 className={`text-h2 text-white`}>Rainfall Forecast</h1>
        <DateComponent />
      </section>
      <section
        className={`flex-grow flex text-menu-t items-center justify-center text-white z-[-99`}
      >
        <Status input={averageRainfall} type={"rainfall"} />
      </section>
      <section className={`w-full z-20`}>
        <h2 className={`text-menu-t text-center pb-4 text-green-200`}>
          {getRainfall(averageRainfall)}
        </h2>
      </section>
    </main>
  );
}
