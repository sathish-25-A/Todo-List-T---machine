import React, { useState } from 'react';

interface TodoFormProps {
  addTask: (task: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        className="input"
      />
      <button type="submit" className="submit-btn">Add Task</button>
    </form>
  );
};

export default TodoForm;
