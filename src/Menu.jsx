import axios from "axios";

export default function Menu({ menuToggle, setDeleteAll, logout, isLoggedIn }) {
  const deleteAllFunc = async () => {
    if (isLoggedIn) {
      await axios({
        method: "delete",
        url: `http://127.0.0.1:5000/all`,
        headers: {
          token: "Bearer " + localStorage.token,
        },
      });
      setDeleteAll((prev) => !prev);
    }
  };

  return (
    <>
      <div className="absolute z-20 bg-opacity-5 dark:bg-opacity-5 backdrop-blur-sm dark:backdrop-blur-sm dark:border-zinc-600 border border-slate-300 top-0 left-0 rounded-xl ml-3 mt-3 w-32 h-52 lg:h-56 dark:bg-white bg-blue-700 text-slate-950 dark:text-white font-light text-xl flex flex-col items-start py-1 ">
        <h1
          onClick={menuToggle}
          className="text-white mb-1 cursor-pointer font-normal ml-24 pl-2"
        >
          x
        </h1>
        <h1
          onClick={deleteAllFunc}
          className="items-center text-[16px] font-normal cursor-pointer dark:text-white bg-white dark:bg-zinc-900 bg-opacity-40 h-7 rounded-full w-28 border-[1px] hover:bg-white dark:hover:bg-zinc-200 hover:bg-opacity-90  transition-all hover:text-black dark:hover:text-black border-white flex justify-center mt-5 ml-2"
        >
          CLEAR ALL
        </h1>
        <h1
          onClick={logout}
          className="hover:bg-red-600 hover:text-black text-base cursor-pointer text-red-500 bg-white hover:bg-opacity-80 bg-opacity-40 dark:bg-zinc-900 dark:bg-opacity-80 transition-all border-[1px] border-red-500 h-7 dark:hover:bg-red-600 rounded-full w-28 flex font-bold justify-center items-center mt-5 ml-2"
        >
          LOGOUT
        </h1>
      </div>
    </>
  );
}
