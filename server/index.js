const CheckWin = require("./Helpers/CheckWin")

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors);
const server = http.createServer(app);

let players = [];

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join-room", (data) => {
        const { room, username, currClientId } = data;

        console.log(`player ${username} joined room ${room} with id ${currClientId}`);
        players.push({ username, id: currClientId, room });
        socket.join(room);
        let newPlayers = players.filter((player) => player.room === room);
        console.log(newPlayers);


        io.in(room).emit("player-joined", newPlayers);
    })

    socket.on("update-grid", (data) => {
        //io.emit("check-win", data);
        console.log(socket.id);
        const { newGrid, currPlayer, room, currClientId } = data;
        console.log(`new grid: ${newGrid}, currPlayer: ${currPlayer}, room: ${room}, client id: ${currClientId}`);
        let win = CheckWin(newGrid, currPlayer);

        io.in(room).emit("player-move", { win, newGrid, currPlayer });

    })
})


server.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001")
})