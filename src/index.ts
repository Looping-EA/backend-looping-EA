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
        const chatID = socket.handshake.query.chatID
        socket.join(chatID)
        console.log("A user connected");



        socket.on('disconnect', function () {
            socket.leave(chatID)
            console.log('A user disconnected');
         });
        socket.on('send_message', message => {
            const receiverChatID = message.receiverChatID
            const senderChatID = message.senderChatID
            const content = message.content
    
            //Send message to only that particular room
            socket.in(receiverChatID).emit('receive_message', {
                'content': content,
                'senderChatID': senderChatID,
                'receiverChatID':receiverChatID,
            })
        })
    // ...
    });
    io.on("error", (error) => {
        console.log("There is an error", error);
    });

    httpServer.listen(3000, function(){console.log('[ SOCKETS LISTENING ]')});
}

main();