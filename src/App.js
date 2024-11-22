import React, {useState, useEffect} from "react" ;
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ?  JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !==  id));
  };

  const editTask = (id) => {
    setEditing(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingText(taskToEdit.text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text:  editingText } : task
      )
    );
    setEditing(null);
    setEditingText("");
  };

  return (
    <div className="app">
      <h1> Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task" 
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id}  className="task-item">
            {editing === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
              </>
              ) : (
                <>
                  <span>{task.text}</span>
                  <button onClick={() => editTask(task.id)}>Edit</button>
                </>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
