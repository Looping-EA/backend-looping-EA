// Projects model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import User, { IUser } from './User';
import Task, { ITask} from './Task';
import Chat, { IChat} from './Chat';
import Entry, { IEntry} from './Entry';

// Create a schema based on discussed
// projects model:
const schema = new Schema({
    name: String,
    chats: [{
        type: Schema.Types.ObjectId,
        ref:Chat
    }],
    creationDate: Date,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref:Task
    }],
    description: String,
    collaboration: [{
        type: Schema.Types.ObjectId,
        ref:User
    }],
    owner: [{
        type: Schema.Types.ObjectId,
        ref:User
    }],
    members:[{
        type:Schema.Types.ObjectId,
        ref:User
    }],
    entry:[{
        type:Schema.Types.ObjectId,
        ref:Entry
    }]
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IProjects extends Document {
    name: String,
    chats: IChat['_id'];
    creationDate: Date;
    tasks:ITask['_id'];
    description: String,
    collaboration: IUser['_id'];
    owner: IUser['_id'];
    members:IUser['_id'];
}

export default model<IProjects>('Project', schema); // EXPORT THE MODEL