import { useState, useRef, useEffect } from "react";

import ReactDatePicker from "./ReactDatePicker";

function AddSection() {
  const [search, setSearch] = useState("");
  const [add, setAdd] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [past, setPast] = useState(false);
  const [checker, setChecker] = useState(false);
  const inputRefs = useRef([]);
  useEffect(function () {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setAdd(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(
    function () {
      if (add.length > 0) {
        localStorage.setItem("tasks", JSON.stringify(add));
      }
    },
    [add]
  );
  function addTask(item, date) {
    if (!search || !selectedDate) {
      setChecker(true);
      setTimeout(() => {
        setChecker(false);
      }, 2000);

      return;
    }
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    if (today > date) {
      setPast(true);
      setTimeout(() => {
        setPast(false);
      }, 2000);
      return;
    }
    const isToday = date.toLocaleDateString() === today.toLocaleDateString();

    const formattedDate = date ? date.toLocaleDateString() : "";
    setAdd((add) => [
      { item, text: item, date: formattedDate, isToday },
      ...add,
    ]);
    setChecker(false);
    setSearch("");
    setSelectedDate(null);
  }
  function handleEdit(index) {
    setAdd((add) =>
      add.map((task, i) => (i === index ? { ...task, isEditable: true } : task))
    );
    setTimeout(() => inputRefs.current[index]?.focus(), 0);
  }
  function handleSave(index) {
    setAdd((add) =>
      add.map((task, i) =>
        i === index ? { ...task, isEditable: false } : task
      )
    );
  }
  function handleChange(e, index) {
    const newText = e.target.value;
    setAdd((add) =>
      add.map((task, i) => (i === index ? { ...task, text: newText } : task))
    );
  }
  function handleDelete(index) {
    setAdd((add) => add.filter((_, i) => i !== index));
  }
  function handleKeypress(e) {
    if (e.key === "Enter") {
      addTask(search, selectedDate);
    }
  }

  return (
    <div className="add">
      <input
        type="text"
        placeholder="What is your plan?"
        className="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeypress}
      />

      <button className="picker">
        <ReactDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </button>

      <button onClick={() => addTask(search, selectedDate)} className="addtask">
        Add Task
      </button>
      {past ? (
        <h2 className="checker">
          I'm sure you can't have work to do in the past:)
        </h2>
      ) : (
        ""
      )}
      {checker ? <h2 className="checker">No empty work please</h2> : ""}

      <div className="list">
        {add.length > 0 ? <h2 className="task">Tasks</h2> : ""}
        <ul>
          {add.map((el, i) => (
            <li key={i}>
              {el.isEditable ? (
                <input
                  type="text"
                  className="newText"
                  spellCheck="false"
                  value={el.text}
                  onChange={(e) => handleChange(e, i)}
                  ref={(el) => (inputRefs.current[i] = el)}
                />
              ) : (
                <h3 className="item">{el.text}</h3>
              )}
              <div className="btn">
                {el.isToday ? (
                  <h3 className="date">Due date-Today</h3>
                ) : (
                  <h3 className="date">Due date-{el.date}</h3>
                )}
                {el.isEditable ? (
                  <button className="edit" onClick={() => handleSave(i)}>
                    Save
                  </button>
                ) : (
                  <button className="edit" onClick={() => handleEdit(i)}>
                    Edit
                  </button>
                )}
                <button className="delete" onClick={() => handleDelete(i)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddSection;
