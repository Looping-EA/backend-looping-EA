//Index.ts
//Entry point

import app from "./app";
import {startDatabase} from './database';

async function main() {
    // Connect to the database
    startDatabase();

    // Make the express app listen to the PORT
    const PORT = app.get('PORT');
    await app.listen(PORT);
    
    // Message
    console.log('LISTENING @ ', PORT);
}

main();