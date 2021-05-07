// Task model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import User, { IUser } from './User';

// Create a schema based on discussed
// task model:
const schema = new Schema({
    name: String,
    description: String,
    status: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref:User
    }],
    dateInitial: Date,
    dateFinal: Date
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface ITask extends Document {
    name: String,
    description: String,
    status: String,
    members:IUser['_id'];
    dateInitial: Date,
    dateFinal: Date
}

export default model<ITask>('Task', schema); // EXPORT THE MODEL