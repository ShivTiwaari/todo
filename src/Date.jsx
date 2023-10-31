export default function DateComponent() {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let d = new Date();
  return (
    <div className="flex justify-between mt-2">
      <div className=" h-8 w-28 lg:h-4  flex items-baseline lg:p-2 xl:px-1 xl:pb-9  ml-6 mt-5 lg:ml-12 lg:mt-10 lg:w-36 shadow-gray-400 shadow-md rounded-full border border-blue-300 dark:shadow-zinc-950 dark:bg-[#EDEDED] bg-blue-200">
        <div className="text-blue-950  my-auto dark:text-slate-950 flex justify-around items-baseline w-36">
          <h1 className="text-base  lg:text-lg font-light dark:font-normal ">
            Today's tasks
          </h1>
        </div>
      </div>
      <div className="px-2 h-8 w-28 lg:h-8 border dark:border-[#444444] dark:border-2 border-blue-300 flex items-baseline lg:p-2 xl:px-3 xl:pb-9  mr-6 mt-5 lg:ml-14 lg:mr-12 lg:mt-10 lg:w-32 shadow-gray-400 shadow-md rounded-3xl dark:shadow-slate-950 dark:bg-zinc-950 bg-blue-200">
        <div className="text-blue-950  my-auto dark:text-slate-100 flex justify-around items-baseline w-28">
          <h1 className="text-base lg:text-xl font-light dark:font-normal ">
            {d.getDate()}
          </h1>
          <h2 className="text-sm lg:text-base dark:text-slate-200 dark:font-normal font-light">
            {months[d.getMonth()]}
          </h2>
          <h3 className="text-xs lg:text-sm dark:text-slate-100  font-normal">
            {d.getFullYear()}
          </h3>
        </div>
      </div>
    </div>
  );
}
