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
    isAdmin: Boolean,
    recomendations: [{
        type: Schema.Types.ObjectId,

    }],
    projectsOwned: [{
        type: Schema.Types.ObjectId,

    }],
    projectsParticipants: [{
        type: Schema.Types.ObjectId,
    }],
    aboutMe: String,
    skills: String,
    projects: String,
    strengths: String,
    notifications: [{
        type:String,
    }],
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
    isAdmin: Boolean;
    recomendations: Array<any>;
    projectsOwned: Array<any>;
    projectsParticipants: Array<any>;
    aboutMe: String,
    skills: String,
    projects: String,
    strengths: String,
    notifications:Array<any>,
    weaknesses: String
}

export default model<IUser>('User', schema); // EXPORT THE MODEL