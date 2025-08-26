const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
];
let nextId = 2;

app.get('/', (req, res) => {
    res.send('Welcome to the TODO API!');
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/todo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.post('/todos/create', (req, res) => {
    const newTodo = {
        id: nextId++,
        title: req.body.title,
        completed: false,
    };
    if (!newTodo.title) {
        return res.status(400).send('Title is required');
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/update/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], ...req.body };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/delete/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== todoId);
    if (todos.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
