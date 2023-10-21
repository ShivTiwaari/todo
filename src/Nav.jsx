function Nav({
  toggleMenu,
  menuToggle,
  setMode,
  mode,
  setLoginVisible,
  isLoggedIn,
  user,
}) {
  return (
    <>
      <nav
        onClick={menuToggle}
        className="bg-blue-950 dark:bg-[#444444] text-white flex justify-between rounded-t-xl lg:h-16 xl:h-16 h-12 w-full absolute top-[-1px]"
      >
        <div className="flex">
          <div
            onClick={toggleMenu}
            className="ham lg:w-16 xl:w-16 w-12 h-full lg:mx-1 xl:mx-1 flex text-white items-center justify-center"
          >
            <img
              className="cursor-pointer z-10 lg:w-5 xl:w-5 w-4"
              src="../src/img/ham.svg"
              alt="menu"
            />
          </div>
          <div className="h-full flex items-center">
            <h1 className="text-base lg:text-xl xl:text-xl ">TODO APP</h1>
          </div>
        </div>
        <div className="flex items-center justify-between w-48 lg:w-60 h-full">
          {isLoggedIn ? (
            <div
              className={`lg:w-48 w-40 h-full  flex items-center justify-end lg:pr-5 text-base lg:text-lg`}
            >
              <h1 className="text-white">{user}</h1>
            </div>
          ) : (
            <div
              className={`lg:w-48 w-40 h-full flex items-center justify-end lg:pr-5 text-base lg:text-lg`}
            >
              <h1
                onClick={() => setLoginVisible((prev) => !prev)}
                className="text-base transition-all bg-indigo-800 hover:bg-blue-900 dark:hover:bg-zinc-700 cursor-pointer dark:bg-[#DA0037] px-4 py-1 rounded-full lg:text-lg xl:text-lg"
              >
                LOGIN
              </h1>
            </div>
          )}
          <div className="lg:w-12 w-10 flex lg:justify-start justify-center">
            {mode == "light" ? (
              <img
                onClick={() => setMode("dark")}
                className="cursor-pointer w-5 xl:w-7 lg:w-7 "
                src="../src/img/dark.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setMode("light")}
                className="cursor-pointer w-5 xl:w-7 lg:w-7"
                src="../src/img/light.svg"
                alt=""
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
