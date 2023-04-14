import React, { useState } from 'react';

function Todolist() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState('');

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (inputValue.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: inputValue }]);
            setInputValue('');
        }
    }

    function deleteTodo(todoId) {
        setTodos(todos.filter(todo => todo.id !== todoId))
    }

    function editing(todoId, todoText) {
        setEditingTodoId(todoId)
        setEditingTodoText(todoText)
    }

    function cancelEdit() {
        setEditingTodoId(null)
        setEditingTodoText('')
    }

    function handleEditSubmit(event, todoId) {
        event.preventDefault();
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, text: editingTodoText }
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditingTodoId(null);
        setEditingTodoText('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Add Todo List...'
                    value={inputValue}
                    onChange={handleInputChange} />
                <button type='submit'>Add</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editingTodoId === todo.id ? (
                            <form onSubmit={event => handleEditSubmit(event, todo.id)}>
                                <input type="text" placeholder='Add Todo List...'
                                    value={editingTodoText}
                                    onChange={event => setEditingTodoText(event.target.value)}
                                />
                                <button type='submit'>save</button>
                                <button type='button' onClick={cancelEdit}>cancel</button>
                            </form>
                        ) : (
                            <>
                                {todo.text}
                                <button onClick={() => editing(todo.id, todo.text)}>edit</button>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </>)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todolist;
