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
   // await app.listen(PORT);

    
    // Message
    console.log('LISTENING @ ', PORT);

    //sockets
    const httpServer = createServer(app);
    //const io = new Server(httpServer, { cors: { origin: '*', methods: ["GET", "POST"] }, transports: ["websocket"]});
    var options={ cors: { origin: '*', methods: ["GET", "POST"] }, transports: ["websocket"]};
    let io         = require('socket.io')(httpServer,options);
  

    io.on("connection", (socket: Socket) => {
        console.log("A user connected");



        socket.on('disconnect', function () {
            console.log('A user disconnected');
         });
    // ...
    });
    io.on("error", (error) => {
        console.log("There is an error", error);
    });

    httpServer.listen(3000, function(){console.log('[ SOCKETS LISTENING ]')});
}

main();