const express = require("express");

const app = express();
const PORT = 8081;

app.use(express.json());

let todos = [
    { "id": 1, "title": "sdf", "done": true },
    { "id": 2, "title": "asdf", "done": false }
];

app.get("/todos", (req, res) => {
    return res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(v => v.id === id);
    if (!todo) return res.status(404).json({
        "message": "Not Found"
    });

    return res.json(todo);
});

app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(415).end();

    const newTodo = {
        id: todos.length + 1,
        title,
        done: false
    };

    todos.push(newTodo);

    return res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    const todo = todos.find(v => v.id === id);
    if (!todo) return res.status(404).end();

    const newTodo = {
        ...todo,
        title,
        done
    };

    return res.status(200).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(v => v.id === id);
    if (!todo) return res.status(404).end();

    todos = todos.filter(v => v.id !== id);

    return res.status(204).end();
});

app.get("/", (req, res) => {
    res.send("서버 정상 작동중");
});

app.get("/health", (req, res) => {
    return res.status(200).json({ "status": "ok" });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});