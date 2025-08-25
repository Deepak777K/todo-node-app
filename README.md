


# 🚀 Step 1: Setup Node.js & Express

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
