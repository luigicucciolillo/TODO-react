import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() && deadline) {
      const task = {
        id: Date.now(),
        description: newTask,
        deadline,
        status: 'IN PROGRESS',
      };
  
      try {
        // POST request to the backend
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const newTaskFromServer = await response.json();
        // Add the new task to the state after posting to the backend
        setTasks([...tasks, newTaskFromServer]);
  
        // Reset the form fields
        setNewTask('');
        setDeadline('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };
  

  const markAsCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'COMPLETED' } : task));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.description);
      setDeadline(taskToEdit.deadline);
      deleteTask(id);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <Header />
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        deadline={deadline}
        setDeadline={setDeadline}
        addTask={addTask}
      />
      <TaskList
        tasks={tasks}
        editTask={editTask}
        markAsCompleted={markAsCompleted}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
