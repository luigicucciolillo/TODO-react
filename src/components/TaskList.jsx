import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, editTask, markAsCompleted, deleteTask }) => (
  <section className="list">
    <h2>Tareas</h2>
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        editTask={editTask}
        markAsCompleted={markAsCompleted}
        deleteTask={deleteTask}
      />
    ))}
  </section>
);

export default TaskList;