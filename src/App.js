import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');

  const addTask = () => {
    if (newTask.trim() && deadline) {
      const task = {
        id: Date.now(),
        description: newTask,
        deadline,
        status: 'IN PROGRESS',
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setDeadline('');
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
