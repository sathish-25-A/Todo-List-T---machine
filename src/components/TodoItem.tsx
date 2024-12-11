import React, { useState } from 'react';
import { Task } from '../types';

interface TodoItemProps {
  task: Task;
  editTask: (id: number, updatedTask: string) => void;
  toggleCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, editTask, toggleCompletion, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTask.trim()) {
      editTask(task.id, editedTask);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedTask}
            onChange={handleEditChange}
            autoFocus
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="task-content">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompletion(task.id)}
          />
          <span>{task.task}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
