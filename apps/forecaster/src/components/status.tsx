import SG from "../../public/sg_2.svg";

interface Status {
  input: number;
  type: "temperature" | "rainfall" | "humidity";
  color: "violet" | "green" | "red" | "blue";
}

const TextType = ({ type }: Pick<Status, "type">) => {
  return type === "temperature" ? <>C</> : type === "humidity" ? <>%</> : <>mm</>;
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
  const itsHot = () => {
    if (input != 0) {
      return "It's probably Hot"
    } else {
      <>
        {input}
        <TextType type={type} />
      </>
    }
  }
  return (
    <div className={`h-fit w-fit relative text-h2`}>
      <SG className={`${setSGBackground(color)} min-h-[53.8rem]`} />
      <p className={`absolute bottom-[51%] ${input != 0 ? 'left-[2%]' : 'left-[12%]'} text-nowrap ${input != 99 ? 'text-menu' : 'text-h2-m'}`}>
        {itsHot()}
      </p>
      <p className={`absolute bottom-[52%] ${input != 0 ? 'right-[8%]' : 'right-[15%]'} text-nowrap ${input != 0 ? 'text-menu' : 'text-h2-m'}`}>
        {itsHot()}
      </p>
      <p className={`absolute ${input != 0 ? 'right-[39%]' : 'right-[52%]'} bottom-[39%] text-nowrap ${input != 0 ? 'text-menu' : 'text-h2-m'}`}>
        {itsHot()}
      </p>
      <p className={`absolute ${input != 0 ? 'right-[42%]' : 'right-[58%]'} bottom-[80%] text-nowrap ${input != 0 ? 'text-menu' : 'text-h2-m'}`}>
        {itsHot()}
      </p>
      <p className={`absolute ${input != 0 ? 'right-[38%]' : 'right-[52%]'} bottom-[60%] text-nowrap ${input != 0 ? 'text-menu' : 'text-h2-m'}`}>
        {itsHot()}
      </p>
    </div >
  );
};
