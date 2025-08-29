const express = require("express");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Sample data
let todos = [
  { id: 1, task: "Learn backend basics" },
  { id: 2, task: "Build first REST API" }
];

// GET request
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET request by ID for single data
app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST to add data
// app.post("/todos", (req, res) => {
//   const newTodo = {
//     id: todos.length + 1,
//     task: req.body.task
//   };
//   todos.push(newTodo);
//   res.status(201).json(newTodo);
// });


let nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
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

// PUT to Update data
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.task = req.body.task;
  res.json(todo);
});

// DELETE to delete the data or a todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.status(204).send();
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
