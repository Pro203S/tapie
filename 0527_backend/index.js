const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
    { id: 1, title: "Express 설치하기", done: true },
    { id: 2, title: "첫 API 만들기", done: false },
];

app.get("/", (req, res) => {
    res.send("Express 서버가 실행 중입니다.");
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "서버가 정상적으로 동작 중입니다.",
    });
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.get("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "해당 할 일을 찾을 수 없습니다.",
        });
    }

    res.json(todo);
});

app.post("/todos", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "title은 필수입니다.",
        });
    }

    const newTodo = {
        id: todos.length + 1,
        title,
        done: false,
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "해당 할 일을 찾을 수 없습니다.",
        });
    }

    if (title !== undefined) {
        todo.title = title;
    }

    if (done !== undefined) {
        todo.done = done;
    }

    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "해당 할 일을 찾을 수 없습니다.",
        });
    }

    todos = todos.filter((todo) => todo.id !== id);

    res.json({
        message: "삭제되었습니다.",
        deletedTodo: todo,
    });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});