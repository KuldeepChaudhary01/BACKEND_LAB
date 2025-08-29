const express = require("express");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Sample data
let todos = [
  { id: 1, task: "Learn backend basics" },
  { id: 2, task: "Build first REST API" }
];

// Initialize nextId properly to avoid duplicates
let nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is running. Use /todos to see todos.");
});

// GET request for all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET request by ID for single todo
app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST to add new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Task is required" });
  }
  const newTodo = {
    id: nextId++, // always unique, even if items are deleted
    task: task.trim()
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT to update todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Task is required" });
  }

  todo.task = task.trim();
  res.json(todo);
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const exists = todos.some(t => t.id === id);
  if (!exists) return res.status(404).json({ error: "Todo not found" });

  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
