"use client";

import SG from "../../../public/sg_2.svg";

export default function Humidity() {
  return (
    <main className="bg-black max-w-screen min-h-screen px-4 py-8 flex flex-col">
      <section className={`flex flex-col gap-4 z-20`}>
      </section>
      <section
        className={`flex-grow flex text-menu-t items-center justify-center text-white z-[-99`}
      >
      <div className={`h-fit w-fit relative`}>
        <SG className={`bg-white min-h-[100rem]`} />
      </div>
      </section>
    </main>
  );
}
