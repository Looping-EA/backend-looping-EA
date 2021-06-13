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

    //Sockets
    const httpServer = createServer(app);
    //const io = new Server(httpServer, { cors: { origin: '*', methods: ["GET", "POST"] }, transports: ["websocket"]});
    var options={ cors: { origin: '*', methods: ["GET", "POST"] }, transports: ["websocket"]};
    let io         = require('socket.io')(httpServer, options);

    const myClientList = {};
  
    let numUsers=0;
    let addedUser = false;
    io.on("connection", (socket: Socket) => {
        addedUser=true;
        ++numUsers;
        const chatID = socket.id;
        //socket.join(chatID)
        console.log("A user connected with the following ID: ", chatID);
        socket.on("/test",(msg)=>{console.log(msg);})
        socket.on("message", (msg) => {
            console.log("New message");
            console.log(msg);
          });
        socket.on("private message", (anotherSocketId, msg) => {
            socket.to(anotherSocketId).emit("private message", socket.id, msg);
          });
        myClientList[socket.id] = socket;   

        socket.on('disconnect', function () {
            if (addedUser) {
                --numUsers;
            }
            socket.leave(chatID)
            console.log('A user disconnected with the following ID: ', chatID);
            delete myClientList[socket.id];
         });

        //Send message to only a particular user
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