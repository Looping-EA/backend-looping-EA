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

    var myClientList = {};
    let realId;
  
    let numUsers=0;
    let addedUser = false;
    io.on("connection", (socket: Socket) => {
        addedUser=true;
        ++numUsers;
        const chatID = socket.id;
        
        console.log("A user connected with the following ID: ", chatID);
        socket.on("/test",(msg)=>{console.log(msg);});
        socket.on("signin", (id)=> {
            console.log(id);
            realId=id;
            myClientList[id]=socket;
        });

        socket.on("message", (msg) => {
            console.log("New message");
            console.log(msg);
            let targetId= msg.targetId;
            if (myClientList[targetId]) myClientList[targetId].emit("message",msg);
          });

        socket.on('disconnect', function () {
            if (addedUser) {
                --numUsers;
            }
            console.log('A user disconnected with the following ID: ', chatID);
            delete myClientList[realId];
         });[]
    });
    io.on("error", (error) => {
        console.log("There is an error", error);
    });

    httpServer.listen(3000, function(){console.log('[ SOCKETS LISTENING ]')});
}

main();