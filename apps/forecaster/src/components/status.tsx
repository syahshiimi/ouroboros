import SG from "../../public/sg_2.svg";

interface Status {
  input: number;
  type: "temperature" | "rainfall" | "humidity";
  color: "violet" | "green" | "red" | "blue";
}

const TextType = ({ type }: Pick<Status, "type">) => {
  return type === "temperature" ? "C" : type === "humidity" ? "%" : "mm";
};

export const Status = ({ input, type, color }: Status) => {
  return (
    <div className={`h-fit w-fit relative`}>
      <SG className={`bg-${color}-800 min-h-[69rem]`} />
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
