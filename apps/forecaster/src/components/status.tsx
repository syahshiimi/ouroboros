import SG from "../../public/sg_2.svg";

interface Status {
  input: number;
  type: "temperature" | "rainfall" | "humidity";
  color: "violet" | "green" | "red" | "blue";
}

const TextType = ({ type }: Pick<Status, "type">) => {
  return type === "temperature" ? "C" : type === "humidity" ? "%" : "mm";
};

const setSGBackground = (color: Status["color"]) => {
  switch (color) {
    case "violet":
      return "bg-violet-800";
    case "blue":
      return "bg-blue-800";
    case "green":
      return "bg-green-800";
    case "red":
      return "bg-red-800";
  }
};

export const Status = ({ input, type, color }: Status) => {
  return (
    <div className={`h-fit w-fit relative text-h2`}>
      <SG className={`${setSGBackground(color)} min-h-[97rem]`} />
      <p className={`absolute bottom-[51%] left-[12%] text-nowrap`}>
        {input}
        <TextType type={type} />
      </p>
      <p className={`absolute right-[15%] bottom-[52%] text-nowrap`}>
        {input}
        <TextType type={type} />
      </p>
      <p className={`absolute right-[52%] bottom-[39%] text-nowrap`}>
        {input}
        <TextType type={type} />
      </p>
      <p className={`absolute right-[58%] bottom-[80%] text-nowrap`}>
        {input}
        <TextType type={type} />
      </p>
      <p className={`absolute right-[52%] bottom-[60%] text-nowrap`}>
        {input}
        <TextType type={type} />
      </p>
    </div>
  );
};
