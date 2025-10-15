import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filter !== "All") params.status = filter;
      if (search.trim()) params.search = search;

      const res = await axios.get("/api/tasks", { params });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();

    // Refresh list when a task is added
    const onAdd = () => fetchTasks();
    window.addEventListener("taskAdded", onAdd);
    return () => window.removeEventListener("taskAdded", onAdd);
  }, [filter, search]);

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Error deleting task");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating status");
    }
  };

  return (
    <div>
      {/* Filters and Search */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <input
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={fetchTasks}>Search</button>
      </div>

      {/* Task Display */}
      <div style={{ display: "grid", gap: 10 }}>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                borderRadius: 6,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0 }}>{task.title}</h3>
                <small>
                  {new Date(task.createdAt).toLocaleString("en-IN")}
                </small>
              </div>

              <p style={{ margin: "6px 0" }}>{task.description}</p>
              <p style={{ margin: "6px 0" }}>
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-IN")
                  : "—"}{" "}
                | Status: <strong>{task.status}</strong>
              </p>

              <div style={{ display: "flex", gap: 8 }}>
                {task.status !== "Completed" && (
                  <button onClick={() => updateStatus(task._id, "Completed")}>
                    Mark Completed
                  </button>
                )}
                <button onClick={() => updateStatus(task._id, "In Progress")}>
                  Mark In Progress
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{ background: "#f44", color: "#fff" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
