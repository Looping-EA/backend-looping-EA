// User model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import Project, { IProjects } from './Project';

// Create a schema based on discussed
// user model:
const schema = new Schema({
    uname: String,
    pswd: String,
    email: String,
    fullname: String,
    chatID: String,
    recomendations: [{
        type: Schema.Types.ObjectId,

    }],
    projectsOwned: [{
        type: Schema.Types.ObjectId,

    }],
    projectsParticipants: [{
        type: Schema.Types.ObjectId,
    }],
    skills: String,
    strengths: String,
    weaknesses: String
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IUser extends Document {
    uname: String;
    pswd: String;
    email: String;
    fullname: String;
    chatID: String;
    recomendations: Array<any>;
    projectsOwned: Array<any>;
    projectsParticipants: Array<any>;
    skills: String,
    strengths: String,
    weaknesses: String
}

export default model<IUser>('User', schema); // EXPORT THE MODEL