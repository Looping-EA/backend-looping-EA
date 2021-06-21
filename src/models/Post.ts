import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    uname: String,
    msg: String,
    fecha: String
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IPost extends Document {
    uname: String,
    msg: String,
    fecha: String
}

export default model<IPost>('Post', schema); // EXPORT THE MODEL