//Index.ts
//Entry point

import app from "./app";
import {startDatabase} from './database';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

async function main() {
    // Connect to the database
    startDatabase();

    // Make the express app listen to the PORT
    const PORT = app.get('PORT');
    await app.listen(PORT);
    
    // Message
    console.log('LISTENING @ ', PORT);

    //sockets
    const httpServer = createServer();
    const io = new Server(httpServer, {
    // ...
    });

    io.on("connection", (socket: Socket) => {
    // ...
    });

    httpServer.listen(3000);
    console.log('[ SOCKETS LISTENING ]');

}

main();