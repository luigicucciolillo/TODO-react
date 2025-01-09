import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, editTask, markAsCompleted, deleteTask }) => {
  return (
    <div className="task-item">
      <p>{task.description}</p>
      <p>
        <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
          {task.status}
        </span>
        Fecha límite: {new Date(task.deadline).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
        })}
      </p>
      <p>
        <button onClick={() => editTask(task.id)}>EDITAR</button>
        <button onClick={() => markAsCompleted(task.id)}>MARCAR COMO FINALIZADA</button>
        <button onClick={() => deleteTask(task.id)}>ELIMINAR</button>
      </p>
    </div>
  );
};

export default TaskItem;