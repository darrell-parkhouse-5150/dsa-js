import Reaxt, { useState } from 'react';

const TodoApp = _ => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodoText = newTodo.trim();

        if (newTodoText !== '') {
            setTodos([...todos, { text: newTodoText, completed: false }]);
            setNewTodo('');
        }
    };

    const handleToggleCompleted = (idx) => {
        const updatedTodos = todos.map((todo, i) => {
            if (i === idx) {
                todo.completed = !todo.completed;
            }

            return todo;
        });

        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1 className="title">TodoApp</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo item"/>
                    <button type="submit">Add Todo</button>
            </form>
            <ul>
                {
                    todos.map((todo, idx) => {
                        <li key={idx}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={handleToggleCompleted(idx)}
                                />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
                                {todo.text}
                            </span>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default TodoApp;