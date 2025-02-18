import './style.css';
import React, { useState, useEffect } from 'react';

const TodoApp: React.FC = () => {
  const [todo, setTodo] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load saved tasks from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as string[];
    setTodo(savedTodos);
    setIsMounted(true);
  }, []);

  // Save tasks to localStorage whenever todo changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('todos', JSON.stringify(todo));
    }
  }, [todo, isMounted]);

  const taskHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const addTodo = () => {
    if (newTask.trim() !== '') {
      const updatedTodos = [...todo, newTask];
      setTodo(updatedTodos);
      setNewTask('');
    }
  };

  const startEditing = (index: number, value: string) => {
    setEditingIndex(index);
    setEditText(value);
  };

  const updateTodo = () => {
    if (editText.trim() !== '' && editingIndex !== null) {
      const updatedTodos = todo.map((item, i) => (i === editingIndex ? editText : item));
      setTodo(updatedTodos);
      setEditingIndex(null);
      setEditText('');
    }
  };

  const confirmDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const deleteTodo = () => {
    if (deleteIndex !== null) {
      const updatedTodos = todo.filter((_, i) => i !== deleteIndex);
      setTodo(updatedTodos);
      setDeleteIndex(null);
    }
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-5">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Todo App</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={taskHandler}
            className="flex-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new task..."
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Add
          </button>
        </div>
        <ol className="space-y-2">
          {todo.map((element, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
              {editingIndex === index ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none"
                  />
                  <button
                    onClick={updateTodo}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <span className="text-lg">{element}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => startEditing(index, element)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      {deleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg text-white mb-4">Are you sure you want to delete this todo?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={deleteTodo}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
