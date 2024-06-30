
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index, newText) => {
    const newTasks = tasks.map((task, i) => (i === index ? { ...task, text: newText } : task));
    setTasks(newTasks);
    setEditingTask(null);
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(newTasks);
  };

  return (
    <div className="body">
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter a new task" 
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              {editingTask === index ? (
                <input 
                  type="text" 
                  defaultValue={task.text} 
                  onBlur={(e) => editTask(index, e.target.value)}
                  autoFocus
                />
              ) : (
                <>
                  <span onClick={() => toggleComplete(index)}>{task.text}</span>
                  <button onClick={() => setEditingTask(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                  <button onClick={() => toggleComplete(index)}>{task.completed ? 'Undo' : 'Complete'}</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </header>
    </div>
    </div>
  );
}

export default App;
