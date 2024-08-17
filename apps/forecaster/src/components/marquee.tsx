import { getRainfall } from "@/utils/topics/getRainfall";

interface MarqueeText {
  weather: string | undefined;
  marqueeBackground?: "orange" | "blue" | "green" | "violet";
}

export const MarqueeText = ({
  weather,
  marqueeBackground = "orange",
}: MarqueeText) => {
  return (
    <section
      className={`w-full z-20 bg-${marqueeBackground}-800 py-4 fixed left-0 bottom-4`}
    >
      <h2 className={`text-menu-t text-center text-white`}>{weather}</h2>
    </section>
  );
};
