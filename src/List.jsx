import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default function List({ mode, deleteAll, sendErrorToast, isLoggedIn }) {
  const [arr, setArr] = useState([]);
  const [visible, setVisible] = useState("new");
  const getInitialData = async () => {
    // let { data } = await axios.get("http://127.0.0.1:5000/");
    if (isLoggedIn) {
      let { data } = await axios({
        method: "get",
        url: "http://ec2-13-50-16-252.eu-north-1.compute.amazonaws.com:5000/",
        headers: {
          token: `Bearer ${localStorage.token}`,
        },
      });
      if (Array.isArray(data)) {
        setArr(data);
      } else {
        sendErrorToast("An error occurred, can't load tasks");
      }
    }
  };
  useEffect(() => {
    getInitialData();
  }, []);
  useEffect(() => {
    setArr([]);
    getInitialData();
  }, [deleteAll, isLoggedIn]);

  let list = arr.map((i) => (
    <li
      className="flex text-lg dark:text-zinc-200 text-blue-950 mb-3"
      key={i.id}
    >
      <input
        onChange={() => handleCheck(i.id)}
        className="lg:mr-5 mr-5 w-4 checkbox checked:bg-blue-950"
        type="checkbox"
        checked={i.checked}
      />
      <h1
        className={
          i.checked
            ? "lg:mr-7 mr-5 line-through opacity-30 italic"
            : "lg:mr-7 mr-5"
        }
      >
        {i.task}
      </h1>
      <img
        onClick={() => handleDelete(i.id)}
        className="w-5"
        src={
          mode == "dark"
            ? "../src/img/deleteWhite.svg"
            : "../src/img/deleteBlack.svg"
        }
      />
    </li>
  ));
  const toggle = () => {
    setVisible(visible == "new" ? "done" : "new");
  };
  const addNew = async (txt) => {
    if (isLoggedIn) {
      if (txt) {
        toggle();
        let randId = uuid();
        txt && setArr([...arr, { task: txt, id: randId, checked: false }]);
        txt &&
          (await axios({
            method: "post",
            url: "http://ec2-13-50-16-252.eu-north-1.compute.amazonaws.com:5000",
            data: { task: txt, id: randId, checked: false },
            headers: {
              token: "Bearer " + localStorage.token,
            },
          }));
      } else {
        sendErrorToast("task can't be blank");
      }
    } else {
      sendErrorToast("You are not logged in");
    }
  };
  const handleCheck = (id) => {
    var temp = [...arr];
    for (let i = 0; i < temp.length; i++) {
      if (arr[i].id == id) {
        arr[i].checked = !arr[i].checked;
      }
    }
    setArr([...temp]);
    axios({
      method: "put",
      url: `http://ec2-13-50-16-252.eu-north-1.compute.amazonaws.com:5000/${id}`,
      headers: {
        token: "Bearer " + localStorage.token,
      },
    });
  };
  const handleDelete = (id) => {
    var temp = [...arr];
    var newTemp = temp.filter((i) => i.id != id);
    setArr([...newTemp]);
    axios({
      method: "delete",
      url: `http://ec2-13-50-16-252.eu-north-1.compute.amazonaws.com:5000/${id}`,
      headers: {
        token: "Bearer " + localStorage.token,
      },
    });
  };
  return (
    <>
      <div className="lg:text-lg w-4/5 h-2/3 overflow-x-hidden lg:ml-16 lg:mt-10 ml-10 mt-6 dark:text-slate-200 text-slate-700">
        {arr.length > 0 ? list : <h1>No todos to show...</h1>}
      </div>
      <NewTask toggle={toggle} visible={visible} addNew={addNew} />
    </>
  );
}
