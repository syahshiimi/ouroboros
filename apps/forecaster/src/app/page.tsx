import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

interface GetLink {
  href: string;
  children: ReactNode;
}

const GetLink = ({ href, children }: GetLink) => {
  return (
    <Link href={`/${href.toLowerCase()}`} className={`text-white text-menu`}>
      {children}
    </Link>
  );
};

export default function Home() {
  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4 z-20`}>
        <h1 className={`text-h2 text-white`}>Forecaster</h1>
        <h2 className={`text-h2-m text-white`}>
          Choose the links below to get a forecast of the weather.
        </h2>
      </section>
      <section className={`flex flex-col pt-20`}>
        <GetLink href="humidity">Humidity</GetLink>
        <GetLink href="rainfall">Rainfall</GetLink>
        <GetLink href="temperature">Temperature</GetLink>
      </section>
    </main>
  );
}
