const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "http://localhost:3000" });

io.on("connection", (socket) => {
    console.log("server connected");

    socket.on("beginPath", (data) => {
    socket.broadcast.emit("beginPath", data); // broadcast to all clients except the sender
    });

    socket.on("drawLine", (data) => {
        socket.broadcast.emit("drawLine", data);
    });

    socket.on("changeConfig", (data) => {
        socket.broadcast.emit("changeConfig", data);
    });
    
    socket.on("disconnect", () => {
    console.log("A user disconnected");
    });
});

httpServer.listen(5000);
