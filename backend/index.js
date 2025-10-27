const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 5000;
const DATA_FILE = path.join(__dirname, "todos.json");

	// Helper: Read todos from file
	function readTodos() {
	if (!fs.existsSync(DATA_FILE)) return [];
	const data = fs.readFileSync(DATA_FILE, "utf-8");
	return data ? JSON.parse(data) : [];
	}

	// Helper: Write todos to file
	function writeTodos(todos) {
	fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
	}

	// ✅ GET /todos → Get all todos
	app.get("/todos", (req, res) => {
	const todos = readTodos();
	res.status(200).json(todos);
	});

	// ✅ POST /todos → Create a new todo
	app.post("/todos", (req, res) => {
	const { title, completed = false } = req.body;

	if (!title || title.trim() === "") {
		return res.status(400).json({ error: "Title is required" });
	}

	const todos = readTodos();
	const newTodo = {
		id: Date.now(),
		title: title.trim(),
		completed,
	};

	todos.push(newTodo);
	writeTodos(todos);

	res.status(201).json({ message: "Todo created", todo: newTodo });
	});

	// ✅ PUT /todos/:id → Update a todo
	app.put("/todos/:id", (req, res) => {
	const { id } = req.params;
	const { title, completed } = req.body;

	const todos = readTodos();
	const todoIndex = todos.findIndex((t) => t.id === Number(id));

	if (todoIndex === -1) {
		return res.status(404).json({ error: "Todo not found" });
	}

	if (title !== undefined) todos[todoIndex].title = title;
	if (completed !== undefined) todos[todoIndex].completed = completed;

	writeTodos(todos);
	res.status(200).json({ message: "Todo updated", todo: todos[todoIndex] });
	});

	// ✅ DELETE /todos/:id → Delete a todo
	app.delete("/todos/:id", (req, res) => {
	const { id } = req.params;
	const todos = readTodos();
	const filtered = todos.filter((t) => t.id !== Number(id));

	if (filtered.length === todos.length) {
		return res.status(404).json({ error: "Todo not found" });
	}

	writeTodos(filtered);
	res.status(200).json({ message: "Todo deleted" });
	});

	// ✅ Root route
	app.get("/", (req, res) => {
	res.send("✅ Simple To-Do CRUD API is running");
	});

	// Start server
	app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
	});
