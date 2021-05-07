import mongoose from 'mongoose';

export async function startDatabase() {
    const db = await mongoose.connect('mongodb://mongo:27017/looping', {
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log('[ DATABASE RUNNING ]');
}