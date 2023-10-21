import { useEffect, useState } from "react";
import "./index.css";
import DateComponent from "./Date";
import Nav from "./Nav";
import Menu from "./Menu";
import List from "./List";
import Login from "./Login";
import Signup from "./Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [mode, setMode] = useState(localStorage.mode || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [login, setLogin] = useState(true);
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.token ? true : false
  );
  const [user, setUser] = useState(localStorage.user || "");
  const darkMode = () => {
    localStorage.setItem("mode", "dark");
    document.documentElement.classList.add("dark");
  };
  const lightMode = () => {
    localStorage.setItem("mode", "light");
    document.documentElement.classList.remove("dark");
  };
  useEffect(() => {
    if (localStorage.mode == "dark") {
      document.documentElement.classList.add("dark");
    } else if (localStorage.mode == "light") {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  useEffect(() => {
    switch (mode) {
      case "dark":
        darkMode();
        break;
      case "light":
        lightMode();
        break;
      default:
        break;
    }
  }, [mode]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const menuToggle = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };
  const logout = () => {
    isLoggedIn
      ? toast.warn("Logged out")
      : toast.info("You are already logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
  };
  const sendToast = (message) => {
    toast.success(message);
  };

  const sendErrorToast = (message) => {
    toast.error(message);
  };
  return (
    <>
      {loginVisible && (
        <>
          {login ? (
            <Login
              setLogin={setLogin}
              setLoginVisible={setLoginVisible}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
              sendToast={sendToast}
              sendErrorToast={sendErrorToast}
              mode={mode}
              loginLoader={loginLoader}
              setLoginLoader={setLoginLoader}
            />
          ) : (
            <Signup
              setLogin={setLogin}
              setLoginVisible={setLoginVisible}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
              sendToast={sendToast}
              sendErrorToast={sendErrorToast}
              mode={mode}
              loginLoader={loginLoader}
              setLoginLoader={setLoginLoader}
            />
          )}
        </>
      )}
      <div
        onClick={menuToggle}
        className="bodyDiv w-screen h-screen dark:bg-gray-600 bg-[#AED2FF]"
      ></div>
      {/* todo container starts */}
      <div className="fixed todo top-1/2 left-1/2 w-5/6 bg-[#F0F0F0] dark:bg-[#171717] lg:w-1/2 xl:w-4/12 shadow-2xl shadow-zinc-500 dark:shadow-zinc-900 container rounded-xl xl:h-3/4 lg:h-3/4 h-4/6  flex">
        {menuOpen && (
          <Menu
            menuToggle={menuToggle}
            setDeleteAll={setDeleteAll}
            setIsLoggedIn={setIsLoggedIn}
            logout={logout}
            isLoggedIn={isLoggedIn}
          />
        )}
        <Nav
          menuToggle={menuToggle}
          toggleMenu={toggleMenu}
          mode={mode}
          setMode={setMode}
          setLoginVisible={setLoginVisible}
          isLoggedIn={isLoggedIn}
          user={user}
        />
        <div onClick={menuToggle} className="todoBody w-full h-5/6 mt-12 ">
          <DateComponent />
          <List
            deleteAll={deleteAll}
            sendErrorToast={sendErrorToast}
            isLoggedIn={isLoggedIn}
            mode={mode}
          />
        </div>
      </div>
      {/* todo container ends */}
      {document.documentElement.classList.contains("dark") ? (
        <ToastContainer theme="dark" autoClose={2500} position="top-center" />
      ) : (
        <ToastContainer theme="light" autoClose={2500} position="top-center" />
      )}
    </>
  );
}

export default App;
