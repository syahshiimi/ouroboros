"use client";
import { useState } from "react";
import SG from "../../public/sg_2.svg";
import { HumidityText } from "../../public/text/humidity.text";

const getCurrentDate = () => {
  const date = new Date();
  return date.toTimeString();
};

export default function Home() {
  const [pageState, setPageState] = useState("Humidity");
  const [currentDate, setCurrentDate] = useState(getCurrentDate);

  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4`}>
        <h1 className={`text-6xl text-white`}>{pageState} Forecast</h1>
        <h2 className={`text-xl text-white`}>{currentDate}</h2>
      </section>
      <section className={`flex-grow flex items-center justify-center`}>
        <SG className={`fixed bg-red-700 max-h-[54rem]`} />
      </section>
      <section className={``}>
        <p
          className={`fixed left-[30%] bottom-[50%] text-white text-2xl text-nowrap`}
        >
          Sticky.
        </p>
        <p
          className={`fixed right-[30%] bottom-[48%] text-white text-2xl text-nowrap`}
        >
          Sticky.
        </p>
      </section>
      <section className={`w-full`}>
        <h2 className={`text-2xl text-white text-center pb-4`}>
          {/*I could feel the lick of the wind.*/}
          {HumidityText[2]}
        </h2>
      </section>
    </main>
  );
}
