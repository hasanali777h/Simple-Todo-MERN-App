import { useEffect, useState } from "react";
import axios from "axios";
const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const fetchTodo = async () => {
    try {
      const response = await axios.get("http://localhost:7001/api/v1/tasks");
      setTodo(response.data.task);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };
  useEffect(() => {
    fetchTodo();
  });
  const handleCreateTask = async () => {
    try {
      const newTask = { name: taskName, description: taskDescription };
      await axios.post("http://localhost:7001/api/v1/tasks", newTask);
      setTaskName("");
      setTaskDescription("");
      fetchTodo();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  const handleEdit = (task) => {
    setEditId(task._id);
    setTaskName(task.name);
    setTaskDescription(task.description);
  };
  const handleUpdateTask = async () => {
    try {
      await axios.put(`http://localhost:7001/api/v1/tasks/${editId}`, {
        name: taskName,
        description: taskDescription,
      });
      setEditId(null);
      setTaskName("");
      setTaskDescription("");
      fetchTodo();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleDeleteTask = async (task) => {
    try {
      await axios.delete(`http://localhost:7001/api/v1/tasks/${task._id}`);
      setEditId(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <>
      <h3 className="Roboto font-serif font-normal md:font-bold text-center mt-4">
        Todo Component
      </h3>
      <div className="container justify-center border-2 p-6 ml-4 mt-8">
        <div className="input-group Roboto font-serif font-normal md:font-bold mb-6">
          <span className="input-group-text Roboto font-serif font-normal md:font-bold">
            Task Name:
          </span>
          <input
            className="form-control font-serif text-justify rounded-xl border-4 border-sky-500 border-style: solid"
            aria-label="With textarea"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            name="name"
            placeholder="enter task name"
          />
        </div>
        <div className="input-group Roboto font-serif font-normal md:font-bold mt-2">
          <span className="input-group-text ">Task Description:</span>
          <textarea
            className="form-control text-justify"
            aria-label="With textarea"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            name="description"
            placeholder="enter task description"
          ></textarea>
        </div>
        <div className="d-flex justify-content-center mt-4">
          {editId ? (
            <button className="btn btn-success" onClick={handleUpdateTask}>
              Edit Task
            </button>
          ) : (
            <button className="btn btn-info" onClick={handleCreateTask}>
              Create Task
            </button>
          )}
        </div>
      </div>
      <div className="card p-6 m-8">
        <ul className="card-body">
          {todo.map((t) => (
            <li key={t._id}>
              Task Name: <h5 className="card-title">{t.name}</h5>
              Task description: <p className="card-text">{t.description}</p>
              <div className="d-flex justify-content-center mt-4">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(t)}
                >
                  Update Task
                </button>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button
                  className="btn btn-danger "
                  onClick={() => handleDeleteTask(t)}
                >
                  Delete Task
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Todo;
