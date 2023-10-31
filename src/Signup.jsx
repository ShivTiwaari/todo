import axios from "axios";
import { useState } from "react";

export default function Signup({
  setLogin,
  setLoginVisible,
  setIsLoggedIn,
  setUser,
  sendToast,
  sendErrorToast,
  mode,
  setLoginLoader,
  loginLoader,
}) {
  const [view, setView] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    if (username && password) {
      setLoginLoader(true);
      let { data } = await axios({
        method: "post",
        url: "http://ec2-13-50-16-252.eu-north-1.compute.amazonaws.com:5000/signup",
        data: { username, password },
      });
      if (data.message == "signed in") {
        // toast("Signed in succesfully");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", username);
        setIsLoggedIn(true);
        setUser(username);
        setLoginVisible(false);
        sendToast("Signed in succesfully !");
      } else {
        sendErrorToast("username already exists");
      }
    } else if (!(username || password)) {
      sendErrorToast("username and password can't be blank");
    } else if (!username) {
      sendErrorToast("username can't be blank");
    } else {
      sendErrorToast("password can't be blank");
    }
    setLoginLoader(false);
  };
  return (
    <div>
      <div
        onClick={() => setLoginVisible((prev) => !prev)}
        className="w-screen h-screen z-10 backdrop-blur-sm bg-black bg-opacity-30 fixed"
      ></div>
      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl fixed z-20 top-1/2 left-1/2 login-signup border dark:border-[#444444] border-zinc-900 shadow-zinc-700 shadow-lg dark:shadow-[#444444] w-72 h-72  xl:w-96 xl:h-96 flex flex-col">
        <div className="w-full  h-[15%] flex justify-end items-center">
          <img
            onClick={() => setLoginVisible(false)}
            className="w-3 box-border mx-5 cursor-pointer"
            src="../src/img/closeDark.png"
            alt="X"
          />
        </div>
        <div className=" h-[14%] dark:text-zinc-200 flex justify-center">
          <p>
            <b> Welcome, </b> sign up to continue
          </p>
        </div>
        <div className="h-[19%]  w-full px-5 py-2">
          <form action="submit" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="username"
              className="pl-3 w-full border border-zinc-900 dark:border-zinc-300 text-zinc-900   bg-transparent dark:text-zinc-200 h-12 rounded-lg  outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </form>
        </div>
        <div className="w-full relative lg:pr-12 lg:pl-5 flex lg:items-start items-end justify-center lg:justify-start h-[19%]">
          <form action="submit" onSubmit={handleSignup}>
            <input
              type={view ? "text" : "password"}
              placeholder="password"
              className="pl-3 h-12 rounded-lg lg:ml-0 lg:w-[131%] ml-[3%] w-[94%] border dark:border-zinc-300 border-zinc-900 bg-transparent dark:text-zinc-200 text-zinc-900 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <div className=" h-12 w-[13%] z-40 absolute lg:right-[6%] right-[10%] items-center flex flex-col justify-center ">
            <img
              onClick={() => setView((prev) => !prev)}
              className="w-5 h-5 opacity-80 cursor-pointer "
              src={
                !view
                  ? `../src/img/hide4${mode}.png`
                  : `../src/img/view4${mode}.png`
              }
            />
          </div>
        </div>
        <div className="flex items-start h-[17%] pl-6">
          <button
            onClick={handleSignup}
            className="bg-blue-700  hover:bg-blue-900 text-white w-20 lg:w-24  h-8 lg:h-9 lg:mt-2 mt-3 rounded-lg"
          >
            SIGN UP
          </button>
          {loginLoader && (
            <div className="h-1/3 mt-4 ml-3 flex flex-col ">
              <img className=" w-6" src={`../src/img/${mode}ModeLoader.gif`} />
            </div>
          )}
        </div>
        <div className="h-[16%] pl-6 text-zinc-800 dark:text-zinc-200">
          Already have an account ?
          <button
            onClick={() => setLogin(true)}
            className=" dark:text-blue-600 text-blue-800 w-14 ml-1 underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
