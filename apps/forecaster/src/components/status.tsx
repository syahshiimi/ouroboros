import SG from "../../public/sg_2.svg";

export const Status = ({ input, type }: { input: number; type: string }) => {
  return (
    <div className={`h-fit w-fit relative`}>
      <SG className={`bg-violet-800 min-h-[58rem]`} />
      <p className={`absolute bottom-[51%] left-[12%] text-nowrap`}>{input}%</p>
      <p className={`absolute right-[15%] bottom-[52%] text-nowrap`}>
        {input}
        {type === "temperature" ? "C" : "%"}
      </p>
      <p className={`absolute right-[52%] bottom-[39%] text-nowrap`}>
        {input}
        {type === "temperature" ? "C" : "%"}
      </p>
      <p className={`absolute right-[58%] bottom-[80%] text-nowrap`}>
        {input}
        {type === "temperature" ? "C" : "%"}
      </p>
      <p className={`absolute right-[52%] bottom-[60%] text-nowrap`}>
        {input}
        {type === "temperature" ? "C" : "%"}
      </p>
    </div>
  );
};
