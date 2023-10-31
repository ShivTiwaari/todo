import { useState } from "react";

export default function NewTask({ addNew, visible, toggle }) {
  const [input, setInput] = useState("");

  const updateInput = (e) => {
    setInput(e.target.value);
  };
  const submitForm = (e) => {
    setInput("");
    e.preventDefault();
  };
  const newFunc = () => {
    setInput("");
    toggle();
  };
  return (
    <form onSubmit={submitForm} action="submit">
      <div className="mt-5">
        {visible == "new" && (
          <button
            onClick={newFunc}
            className="hover:bg-blue-950 lg:w-32 lg:ml-16 lg:h-10 ml-10 w-28 h-8 rounded-full text-sm lg:text-base font-normal bg-blue-900 dark:bg-[#444444]  text-slate-100 shadow-gray-400 shadow-lg dark:shadow-slate-950 transition-all dark:hover:bg-zinc-800 dark:hover:shadow-sm dark:hover:shadow-zinc-500"
            type="submit"
          >
            + NEW TODO
          </button>
        )}

        {visible == "done" && (
          <div className="flex ml-7 lg:ml-12">
            <input
              className="bg-transparent border border-slate-700 dark:border-slate-400 rounded-full lg:h-10 lg:w-96 h-8 text-slate-900 dark:text-white w-48 px-5"
              type="text"
              value={input}
              onChange={updateInput}
              autoFocus
            />
            <button
              onClick={() => addNew(input)}
              className="hover:bg-blue-950 lg:w-28 lg:ml-10 lg:h-10 ml-5 w-20 h-7 rounded-full text-base lg:text-xl font-normal bg-blue-900 dark:bg-[#444444]  text-slate-100 shadow-gray-400 shadow-lg dark:shadow-slate-950 transition-all dark:hover:bg-zinc-800 dark:hover:shadow-sm dark:hover:shadow-zinc-500"
              type="submit"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
