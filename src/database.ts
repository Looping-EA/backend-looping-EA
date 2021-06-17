import mongoose from 'mongoose';

export async function startDatabase() {
    const url = process.env.PROD_URL || 'mongodb://127.0.0.1:27017/looping';
    const db = await mongoose.connect(url, {
    	useUnifiedTopology: true,
	useNewUrlParser: true,
    });

    console.log('[ DATABASE RUNNING ]');
}
