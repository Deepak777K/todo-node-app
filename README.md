


# Step 1: Setup Node.js & Express

## Prerequisites

* Install [Node.js](https://nodejs.org/)

## 1.1. Initialize Project

```bash
npm init -y
npm install express
```

## 1.2. Create `index.js`

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Welcome to the TODO API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
```

## 1.3. Run App

```bash
node index.js
```

Visit: [http://localhost:3000](http://localhost:3000)

## 1.4. Optional: Use Nodemon

```bash
npm install --save-dev nodemon
```

Add to `package.json`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

Run with:

```bash
npm run dev
```

---

## Step 2: Create Endpoints for CRUD Operations in `index.js`

### 2.1 Add In-Memory Storage and Middleware

Right after setting up `express.json()` middleware, define a local variable to store todos:

```js
app.use(express.json());

// In-memory storage
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
];
let nextId = 2;
```

This allows temporary storage of tasks while the server is running.

---

### 2.2 Add Basic CRUD Endpoints

#### Get All Todos

```js
app.get('/todos', (req, res) => {
    res.json(todos);
});
```

#### Get Todo by ID

```js
app.get('/todos/todo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});
```

#### Create a New Todo

```js
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
```

#### Update an Existing Todo

```js
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
```

#### Delete a Todo

```js
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
```

---

### Optional: Local Testing with CORS

To enable cross-origin requests during testing (e.g., from a frontend like `test_api.html`):

1. Install and require `cors`:

```bash
npm install cors
```

2. Add this near the top of your file:

```js
const cors = require('cors');
app.use(cors());
```

> Place your test HTML (e.g., `test_api.html`) in the root directory for basic frontend interaction with the API.

---

