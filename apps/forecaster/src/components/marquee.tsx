interface MarqueeText {
  weather: string | undefined;
  marqueeBackground?: "orange" | "blue" | "green" | "violet";
}

export const MarqueeText = ({
  weather,
  marqueeBackground = "orange",
}: MarqueeText) => {
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
      className={`w-full z-20 ${setMarqueeBackground()} pt-4 pb-6 fixed left-0 bottom-8 flex overflow-x-hidden opacity-80 text-h2-m`}
    >
      <h2
        className={`w-full text-center text-white whitespace-nowrap animate-marquee`}
      >
        {weather}
      </h2>
      <h2
        className={`w-full absolute text-center text-white whitespace-nowrap animate-marquee2`}
      >
        {weather}
      </h2>
    </section>
  );
};
