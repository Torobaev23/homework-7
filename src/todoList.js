import React, { useState } from "react";
import './App.css'

export default function Todo () {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleCreateTodo = () => {
        if (inputValue.trim() === '') {
            alert('Нельзя вводить пустоту или пробелы');
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: inputValue
        };

        setTodos([newTodo, ...todos]);
        setInputValue('');
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEditTodo = (id) => {
        const editedText = prompt(`Edited -> ${todos.find(todo => todo.id === id).text}`).trim();
        if (editedText !== null && editedText !== '') {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editedText } : todo));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleCreateTodo();
        }
    };


    const handleToggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    return (
        <div>
            <div className="todo">
                <input
                    type="text"
                    placeholder="Введите задачу"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}

                />
                <button onClick={handleCreateTodo}  className='create_button'>Create Todo</button>
            </div>
            <div id="todo_list">
                {todos.map(todo => (
                    <div key={todo.id} className= 'block_text'>
                        <h3 className={todo.completed ? 'toggle' : ''}  onClick={() => handleToggleTodo(todo.id)}>{todo.text}</h3>

                        <div className="div_button">
                            <button className="delete_button"  onClick={() => handleDeleteTodo(todo.id)}>DELETE</button>
                            <button className="edit_button" onClick={() => handleEditTodo(todo.id)}>EDIT</button>

                        </div>
                    </div>
                ))}
            </div>
            <p>для вычеркивания нажмите на задачу</p>
        </div>
    );
}