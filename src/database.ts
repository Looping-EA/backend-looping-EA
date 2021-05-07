import mongoose from 'mongoose';

export async function startDatabase() {
    const db = await mongoose.connect('mongodb://root:example@127.0.0.1:27017/looping', {
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log('[ DATABASE RUNNING ]');
}