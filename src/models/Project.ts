// Projects model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import User, { IUser } from './User';
import Task, { ITask} from './Task';
import Chat, { IChat} from './Chat';
import Team, { ITeam} from './Team';

// Create a schema based on discussed
// projects model:
const schema = new Schema({
    name: String,
    chats: [{
        type: Schema.Types.ObjectId,
        ref:Chat
    }],
    creationDate: Date,
    teams: [{
        type: Schema.Types.ObjectId,
        ref:Team
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref:Task
    }],
    description: String,
    collaboration: [{
        type: Schema.Types.ObjectId,
        ref:User
    }],
    owners: [{
        type: Schema.Types.ObjectId,
        ref:User
    }],
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IProjects extends Document {
    name: String,
    chats: IChat['_id'];
    creationDate: Date,
    teams: ITeam['_id'];
    tasks:ITask['_id'];
    description: String,
    collaboration: IUser['_id'];
    owners: IUser['_id'];
}

export default model<IProjects>('Project', schema); // EXPORT THE MODEL