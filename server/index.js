import express from 'express'
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors'

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

const PORT = 4000;

app.get('/', (req,res) => {
    res.send("helloo world!!");
})



io.on('connection', (socket)=>{
    console.log(`User connected with id ${socket.id}`)
    socket.emit("welcome", `yeh meri socket id hai: ${socket.id}`)
    socket.broadcast.emit("welcome-join", `${socket.id} has joined the server`)

    socket.on("message" , (data) => {
        console.log(data);
    })
})

server.listen(PORT, ()=> {
    console.log(`App is listening at port ${PORT}`)
})