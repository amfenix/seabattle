import express from "express";
import session from 'express-session';
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import GameManager from './src/GameManager.js';
import { config } from 'dotenv';

config({ path: '../.env' });

const gm = new GameManager();


const __dirname = path.resolve();
const { PORT_SERVER = 3000, PORT } = process.env;
const app = express();

app.set('trust proxy', 1)
const sessionMiddleware = session({
    secret: 'keyboard cat',
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
});

app.use(sessionMiddleware);

// app.use(express.static(path.join(__dirname, './front')))
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: [`http://localhost:${PORT}`, `https://seabattle.react-learning.ru`]
    }
});


io.on("connection", (socket) => {
    io.emit("playerCount", io.of('/').sockets.size);

    socket.on('disconnect', () => {
        io.emit("playerCount", io.of('/').sockets.size);
        gm.disconnect(socket)
    })
    gm.connection(socket);

});

async function main() {
    await httpServer.listen(PORT_SERVER);
    console.log(`Server listen port ${PORT_SERVER}`)
}

main()

