"use client";

import DateComponent from "@/components/date";
import { useDataHook } from "@/hooks/useDataHook";
import { reducer } from "@/utils/reducer";
import { getRainfall } from "@/utils/topics/getRainfall";
import { Status } from "@/components/status";
import { MarqueeText } from "@/components/marquee";

export default function Rainfall() {
  const { data, isLoading, isError } = useDataHook("rainfall");

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
        <Status input={averageRainfall} type={"rainfall"} color={"blue"} />
      </section>
      <MarqueeText
        weather={getRainfall(averageRainfall)}
        marqueeBackground={"violet"}
      />
    </main>
  );
}
