"use client";

import { useDataHook } from "@/hooks/useDataHook";
import { getHumidityText } from "@/utils/topics/getHumidity";
import DateComponent from "@/components/date";
import { Status } from "@/components/status";
import { reducer } from "@/utils/reducer";

export default function Humidity() {
  const { data, isLoading, isError } = useDataHook("humidity");

  if (isLoading) return <p>Retrieving new details</p>;
  if (isError) return <p>Error fetching data</p>;

  const readings = data.data.items[0].readings;
  const averageHumidity = reducer(readings);

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
        <Status input={averageHumidity}></Status>
      </section>
      <section className={`w-full z-20`}>
        {/*TODO: Make the text a marquee.*/}
        <h2 className={`text-menu-t text-center pb-4 text-white`}>
          {/*TODO: Refresh the text visual every 5 minutes.*/}
          {getHumidityText(averageHumidity)}
        </h2>
      </section>
    </main>
  );
}
