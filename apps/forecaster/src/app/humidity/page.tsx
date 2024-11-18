"use client";

import { useDataHook } from "@/hooks/useDataHook";
import { getHumidityText } from "@/utils/topics/getHumidity";
import DateComponent from "@/components/date";
import { Status } from "@/components/status";
import { reducer } from "@/utils/reducer";
import { MarqueeText } from "@/components/marquee";
import { Timestamp } from "@/components/timestamp";
import { TitleHeader } from "@/components/title";

export default function Humidity() {
  const { data, isLoading, isError } = useDataHook("humidity");

  if (isLoading) return <p>Retrieving new details</p>;
  if (isError) return <p>Error fetching data</p>;

  const readings = data.data.data.readings[0].data;
  const averageHumidity = () => {
    if (!data.data.data) {
      // return a ridiculous number
      return 999
    } else {
      return parseFloat(
        reducer(data.data.data.readings[0].data).toFixed(1),
      )
    }
  };
  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      {!data.data ? null :
        <Timestamp readingTime={data.data.data.readings[0].timestamp} />
      }
      <section className={`flex flex-col gap-0 z-20`}>
        <TitleHeader>
          Humidity Forecast
        </TitleHeader>
        <DateComponent />
      </section>
      <section
        className={`flex-grow flex text-menu-t items-center justify-center text-white z-[-99`}
      >
        <Status input={averageHumidity()} type={"humidity"} color={"violet"} />
      </section>
      <MarqueeText
        average={averageHumidity()}
        averageCallback={() => getHumidityText(averageHumidity())}
        marqueeBackground={"green"}
      />
    </main>
  );
}
