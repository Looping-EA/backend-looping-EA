import { Schema, model, Document } from 'mongoose';
import Post, { IPost } from './Post';

// Create a schema based on discussed
// forum model:
const schema = new Schema({
    name: String,
    description: String,
    post: [{
        type: Schema.Types.ObjectId,
        ref: Post
    }],
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IEntry extends Document {
    name: String,
    description: String,
    post: IPost['_id'];
}

export default model<IEntry>('Entry', schema); // EXPORT THE MODEL