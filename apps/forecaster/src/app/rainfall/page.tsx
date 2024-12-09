"use client";

import DateComponent from "@/components/date";
import { useDataHook } from "@/hooks/useDataHook";
import { reducer } from "@/utils/reducer";
import { getRainfall } from "@/utils/topics/getRainfall";
import { Status } from "@/components/status";
import { MarqueeText } from "@/components/marquee";
import { Timestamp } from "@/components/timestamp";
import { TitleHeader } from "@/components/title";

export default function Rainfall() {
  const { data, isLoading, isError } = useDataHook("rainfall");

  if (isLoading) return <p>Retrieving new details</p>;
  if (isError) return <p>Error fetching data</p>;

  const averageRainfall = () => {
    if (!data.data.data) {
      // return a ridiculous number
      return 999
    } else {
      return parseFloat(
        reducer(data.data.data.readings[0].data).toFixed(1),
      )
    }
  };

  const readingTimeNotAv = !data.data || !data.data.data

  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      {readingTimeNotAv ? null :
        <Timestamp readingTime={data.data.data.readings[0].timestamp} />
      }
      <section className={`flex flex-col gap-0 z-20`}>
        <TitleHeader>
          Rainfall Forecast
        </TitleHeader>
        <DateComponent />
      </section>
      <section
        className={`flex-grow flex text-menu-t items-center justify-center text-white z-[-99`}
      >
        <Status input={averageRainfall()} type={"rainfall"} color={"blue"} />
      </section>
      <MarqueeText
        average={averageRainfall()}
        averageCallback={() => getRainfall(averageRainfall())}
        marqueeBackground={"violet"}
      />
    </main>
  );
}
