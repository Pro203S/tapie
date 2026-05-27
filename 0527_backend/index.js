const express = require("express");

const app = express();
const PORT = 8081;

app.get("/", (req, res) => {
    res.send("서버 정상 작동중");
});

app.get("/health", (req, res) => {
    return res.status(200).json({ "status": "ok" });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});