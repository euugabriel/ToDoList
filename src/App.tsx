import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { CircleFadingPlus } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { SquarePen } from 'lucide-react';

import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  // Carregar todos do localStorage ao inicializar o componente
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSaveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
    <>
      <div className='bg-slate-800 text-white h-96 w-96 ml-40 mt-24 rounded-2xl'>
        {/* header */}
        <div>
          <h2 className='border-b border-solid border-slate-600 ml-2 mr-2 pt-7 pb-7 text-2xl text-center'>Todo List</h2>
        </div>

        {/* main */}
        <div className='mt-6'>
          <h2 className='ml-2 mt-5'>Interaja com as tarefas usando:</h2>
          <button className='ml-2 mt-4' onClick={handleAddTodo}><CircleFadingPlus /></button>
        </div>

        <form onSubmit={handleAddTodo} className='flex flex-col items-center'>
          <input
            type='text'
            className='w-72 mt-5 h-10 text-center bg-slate-900 text-white rounded-2xl'
            placeholder='Insira sua Tarefa!'
            value={newTodo}
            onChange={handleInputChange}
          />
        </form>

        <button onClick={handleSaveTodos} className='ml-2 mt-4 bg-blue-500 text-white p-2 rounded'>Salvar</button>

        <ul className='mt-6'>
          {todos.map(todo => (
            <li key={todo.id} className='flex justify-between items-center ml-2 mr-2 mt-2 p-2 bg-slate-700 rounded-2xl'>
              <span
                onClick={() => handleToggleTodo(todo.id)}
                className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              >
                {todo.text}
              </span>
              <div>
                <button onClick={() => handleDeleteTodo(todo.id)} className='ml-2'><Trash2 /></button>
                <button className='ml-2'><SquarePen /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
