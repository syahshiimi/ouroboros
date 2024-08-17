"use client";

import { useDataHook } from "@/hooks/useDataHook";
import { getHumidityText } from "@/utils/topics/getHumidity";
import DateComponent from "@/components/date";
import { Status } from "@/components/status";
import { reducer } from "@/utils/reducer";
import { getCurrentDate } from "@/utils/date";
import { MarqueeText } from "@/components/marquee";

export default function Humidity() {
  const date = getCurrentDate();
  const { data, isLoading, isError } = useDataHook("humidity", date);

  if (isLoading) return <p>Retrieving new details</p>;
  if (isError) return <p>Error fetching data</p>;

  const readings = data.data.data.readings[0].data;
  const averageHumidity = parseFloat(reducer(readings).toFixed(1));

  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4 z-20`}>
        <h1 className={`text-h2 text-white`}>Humidity Forecast</h1>
        <DateComponent />
      </section>
      <section
        className={`flex-grow flex text-menu-t items-center justify-center text-white z-[-99`}
      >
        {/*TODO: Fetch new data every 5 minutes*/}
        <Status input={averageHumidity} type={"humidity"} color={"violet"} />
      </section>
      <MarqueeText
        weather={getHumidityText(averageHumidity)}
        marqueeBackground={"green"}
      />
    </main>
  );
}
