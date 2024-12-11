import './styles/styles.css';
import React, { useState, useEffect } from "react";
import { Task } from './types';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks());
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');  // New filter state

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task: string) => {
    const newTaskObj = { id: Date.now(), task, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
  };

  const editTask = (id: number, updatedTask: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, task: updatedTask } : task
      )
    );
  };

  const toggleCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;  // 'all' filter shows all tasks
  });

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" disabled={!newTask.trim()}>
          Add Task
        </button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        <button onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'active' : ''}>Incomplete</button>
      </div>

      <TodoList
        tasks={filteredTasks}  // Pass filtered tasks
        editTask={editTask}
        toggleCompletion={toggleCompletion}
        deleteTask={deleteTask}
        removeAllTasks={removeAllTasks}
      />
    </div>
  );
};

const getStoredTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export default App;
