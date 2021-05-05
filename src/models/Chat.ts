// Chat model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import Message, { IMessage } from './Message';
import User, { IUser } from './User';

// Create a schema based on discussed
// chat model:
const schema = new Schema({
    name: String,
    description: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref:User
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: Message
    }]
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IChat extends Document {
    name: String,
    description: String,
    members: IUser['_id'];
    messages: IMessage['_id'];
}

export default model<IChat>('Chat', schema); // EXPORT THE MODEL