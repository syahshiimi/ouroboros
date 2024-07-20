"use client";

import SG from "../../../public/sg_2.svg";
import { useDataHook } from "@/hooks/useDataHook";
import { getHumidityText } from "@/utils/topics/getHumidity";
import DateComponent from "@/components/date";

export default function Humidity() {
  const { data, isLoading, isError } = useDataHook("humidity");

  if (isLoading) return <p>Retrieving new details</p>;
  if (isError) return <p>Error fetching data</p>;

  const readings = data.data.items[0].readings;
  const sum = readings.reduce((acc: any, curr: any) => acc + curr.value, 0);
  const length = readings.length;
  const averageHumidity = Math.round(sum / length);

  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4 z-20`}>
        <h1 className={`text-h2 text-white`}>Humidity Forecast</h1>
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
            {averageHumidity}%
          </p>
        </div>
      </section>
      <section className={`w-full z-20`}>
        <h2 className={`text-menu-t text-center pb-4 text-green-200`}>
          {getHumidityText(averageHumidity)}
        </h2>
      </section>
    </main>
  );
}
