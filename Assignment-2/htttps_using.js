const http = require("http");

// Sample data
let todos = [
  { id: 1, task: "Learn backend basics" },
  { id: 2, task: "Build first REST API" }
];

// Initialize nextId properly to avoid duplicates
let nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

// Utility: send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Utility: parse request body
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split("/").filter(Boolean); // remove empty strings
  const method = req.method;

  // GET /todos
  if (method === "GET" && req.url === "/todos") {
    return sendJson(res, 200, todos);
  }

  // GET /todos/:id
  if (method === "GET" && urlParts[0] === "todos" && urlParts[1]) {
    const id = parseInt(urlParts[1]);
    const todo = todos.find(t => t.id === id);
    if (!todo) return sendJson(res, 404, { error: "Todo not found" });
    return sendJson(res, 200, todo);
  }

  // POST /todos
  if (method === "POST" && req.url === "/todos") {
    try {
      const body = await getRequestBody(req);
      if (!body.task || body.task.trim() === "") {
        return sendJson(res, 400, { error: "Task is required" });
      }
      const newTodo = {
        id: nextId++,
        task: body.task.trim()
      };
      todos.push(newTodo);
      return sendJson(res, 201, newTodo);
    } catch (err) {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }
  }

  // PUT /todos/:id
  if (method === "PUT" && urlParts[0] === "todos" && urlParts[1]) {
    try {
      const id = parseInt(urlParts[1]);
      const todo = todos.find(t => t.id === id);
      if (!todo) return sendJson(res, 404, { error: "Todo not found" });

      const body = await getRequestBody(req);
      if (!body.task || body.task.trim() === "") {
        return sendJson(res, 400, { error: "Task is required" });
      }
      todo.task = body.task.trim();
      return sendJson(res, 200, todo);
    } catch (err) {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }
  }

  // DELETE /todos/:id
  if (method === "DELETE" && urlParts[0] === "todos" && urlParts[1]) {
    const id = parseInt(urlParts[1]);
    const exists = todos.some(t => t.id === id);
    if (!exists) return sendJson(res, 404, { error: "Todo not found" });

    todos = todos.filter(t => t.id !== id);
    res.writeHead(204);
    return res.end();
  }

  // If no route matches
  sendJson(res, 404, { error: "Route not found" });
});

// Start server
server.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
