import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import { addTask, deleteTask, getComments, getTasks } from "./api/api";
import AddTaskForm from "./components/AddTaskForm";
import CommentsPopup from "./components/CommentsPopup";

function App() {
  const [tasks, setTasks] = useState([]);
  const [localTasks, setLocalTask] = useState([]);
  const [comments, setComments] = useState([]);
  const [isActivePopup, setIsActivePopup] = useState(false);

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  const handleAddTask = (body) => {
    const newTask = {
      userId: 1,
      id: tasks.length + 1 + localTasks.length,
      title: body.title,
      body: body.body,
    };
    addTask(newTask).then((res) => {
      console.log("запрос на добавление отправлен", res);
    });
    let newTasks = [newTask, ...localTasks];
    setLocalTask(newTasks);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then((res) => {
      console.log("task delete", res);
    });
  };

  const handleDeleteLocalTask = (id) => {
    const newLocalTasks = localTasks.filter((task) => task.id !== id);
    setLocalTask(newLocalTasks);
  };

  const handleIdComments = (id, isActivePopup) => {
    getComments(id).then((data) => {
      setComments(data);
    });
    setIsActivePopup(isActivePopup);
  };

  const handleClosePopup = () => {
    setIsActivePopup(false);
    setComments([]);
  };
  return (
    <div className="App">
      <AddTaskForm onChange={handleAddTask} />
      <div className="tasks-container">
        {localTasks.map((item) => (
          <Task
            key={item.id}
            data={item}
            handleDeleteTask={handleDeleteLocalTask}
            handleIdComments={handleIdComments}
          />
        ))}

        {tasks.map((item) => (
          <Task
            key={item.id}
            data={item}
            handleDeleteTask={handleDeleteTask}
            handleIdComments={handleIdComments}
          />
        ))}
      </div>
      <CommentsPopup
        data={comments}
        isActivePopup={isActivePopup}
        handleClosePopup={handleClosePopup}
      />
    </div>
  );
}

export default App;
