import React from 'react';
import { Task } from '../types';

interface TodoListProps {
  tasks: Task[];
  editTask: (id: number, updatedTask: string) => void;
  toggleCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
  removeAllTasks: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  editTask,
  toggleCompletion,
  deleteTask,
  removeAllTasks,
}) => {
  return (
    <div className="todo-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <span>{task.task}</span>
            <button className="edit" onClick={() => editTask(task.id, prompt('Edit task', task.task) || task.task)}>
              Edit
            </button>
            <button className="delete" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))
      )}
      <button className="clear-all-button" onClick={removeAllTasks}>
        Clear All
      </button>
    </div>
  );
};

export default TodoList;
