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
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed){
      setTasks(tasks.filter((task) => task.id !== id));
    }
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
        <table className="task-table">
          <thead>
           <tr>
              <th>#</th>
              <th>Task</th>
              <th>Actions</th>
           </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
               <td>{index + 1}</td>
               <td>
                 {editing === task.id ? (
                   <input
                     type="text"
                     value={editingText}
                     onChange={(e) => setEditingText(e.target.value)}
                   />
                 ) : (
                   task.text
                  )}
                </td>
                <td>
                  {editing === task.id ? (
                    <button onClick={() => saveEdit(task.id)}>Save</button>
                  ) : (
                    <button onClick={() => editTask(task.id)}>Edit</button>
                   )}
                   <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
         </tbody>
       </table>
      </div>
    </div>
  );
}

export default App;
