import React from 'react';
import './TaskForm.css';

const TaskForm = ({ newTask, setNewTask, deadline, setDeadline, addTask }) => (
  <section className="form">
    <h2>Nueva tarea</h2>
    <label>
      Escribe la descripción de la tarea
      <textarea
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Descripción de la tarea"
      />
    </label>
    <label>
      Fecha límite
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
    </label>
    <button onClick={addTask}>INSERTAR</button>
  </section>
);

export default TaskForm;