const express = require("express");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Sample in-memory data
let todos = [
  { id: 1, task: "Learn backend basics" },
  { id: 2, task: "Build first REST API" }
];

// 👉 GET - Fetch all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 👉 GET - Fetch a single todo by ID
app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// 👉 POST - Add a new todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 👉 PUT - Update a todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.task = req.body.task;
  res.json(todo);
});

// 👉 DELETE - Remove a todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.status(204).send();
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
