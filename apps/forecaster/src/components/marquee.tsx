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
      className={`w-full z-20 ${setMarqueeBackground()} py-4 fixed left-0 bottom-4`}
    >
      <h2 className={`text-menu-t text-center text-white`}>{weather}</h2>
    </section>
  );
};
