import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };
  // console.log(setTasks);

  const addTask = async () => {
    await fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "DELETE"
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    console.log("Component loaded");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Manager</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task" />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete item</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
