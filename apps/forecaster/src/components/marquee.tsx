import { useEffect, useState } from "react";

interface MarqueeText {
  average: number,
  averageCallback: (average: number) => string | undefined;
  marqueeBackground?: "orange" | "blue" | "green" | "violet";
}

export const MarqueeText = ({
  average,
  averageCallback,
  marqueeBackground = "orange",
}: MarqueeText) => {

  const [text, setText] =  useState(() => averageCallback(average))

  useEffect(() => {
    const texter = setInterval(() => {
      const newText = averageCallback(average);
      setText(newText);

    }, 60000)
    return () => clearInterval(texter);
  })

  const setMarqueeBackground = () => {
    switch (marqueeBackground) {
      case "violet":
        return "bg-violet-800";
      case "blue":
        return "bg-blue-800";
      case "green":
        return "bg-green-800";
      case "orange":
        return "bg-orange-800";
    }
  };
  return (
    <section
      className={`w-full z-20 ${setMarqueeBackground()} pt-3 pb-3 fixed left-0 bottom-8 flex overflow-x-hidden opacity-80 text-h2-m`}
    >
      <h2
        className={`w-full text-menu-t text-center text-white whitespace-nowrap animate-marquee`}
      >
        {text}
      </h2>
      <h2
        className={`w-full text-menu-t absolute text-center text-white whitespace-nowrap animate-marquee2`}
      >
        {text}
      </h2>
    </section>
  );
};
