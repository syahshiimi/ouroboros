"use client";

import { useDataHook } from "@/hooks/useDataHook";
import { getHumidityText } from "@/utils/topics/getHumidity";
import DateComponent from "@/components/date";
import { Status } from "@/components/status";
import { reducer } from "@/utils/reducer";
import { getCurrentDate } from "@/utils/date";

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
        <Status input={averageHumidity} type={"humidity"}></Status>
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
