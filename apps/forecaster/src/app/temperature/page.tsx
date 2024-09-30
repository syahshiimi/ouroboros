"use client";

import { getTemperatureText } from "@/utils/topics/getTemperature";
import DateComponent from "@/components/date";
import { useDataHook } from "@/hooks/useDataHook";
import { reducer } from "@/utils/reducer";
import { Status } from "@/components/status";
import { MarqueeText } from "@/components/marquee";
import { Timestamp } from "@/components/timestamp";
import { TitleHeader } from "@/components/title";

export default function Temperature() {
  const { data, isLoading, isError } = useDataHook("temperature");

  if (isLoading) return <p>Retrieving new details</p>;
  if (isError) return <p>Error fetching data</p>;

  const readingTimestamp = data.data.data.readings[0].timestamp;
  const averageTemperature = parseFloat(
    reducer(data.data.data.readings[0].data).toFixed(1),
  );

  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <Timestamp readingTime={readingTimestamp}/>
      <section className={`flex flex-col gap-0 z-20`}>
        <TitleHeader>
        Temperature Forecast
        </TitleHeader>
        <DateComponent />
      </section>
      <section
        className={`flex-grow flex text-menu-t items-center justify-center text-white z-[-99`}
      >
        <Status input={averageTemperature} type={"temperature"} color={"red"} />
      </section>
      <MarqueeText
        average={averageTemperature}
        averageCallback={() => getTemperatureText(averageTemperature)}
        marqueeBackground={"blue"}
      />
    </main>
  );
}
