// User model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import Notification, { INotification } from './Notification';
import Photo, { IPhoto } from './Photo';
import Project, { IProjects } from './Project';
import User from './User';

// Create a schema based on discussed
// user model:
const schema = new Schema({
    uname: String,
    pswd: String,
    email: String,
    fullname: String,
    isAdmin: Boolean,
    recomendations: [{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }],
    projectsOwned: [{
        type:Schema.Types.ObjectId,
        ref: 'Project'
    }],
    projectsParticipants: [{
        type: Schema.Types.ObjectId,
    }],
    aboutMe: String,
    skills: String,
    projects: String,
    strengths: String,
    photo: String,
    notifications: [{
        type:Schema.Types.ObjectId,
        ref:Notification
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
    recomendations: IUser['_id'];
    projectsOwned: IProjects['_id'];
    projectsParticipants: Array<any>;
    aboutMe: String,
    skills: String,
    projects: String,
    strengths: String,
    photo:String,
    notifications:INotification['_id'],
    weaknesses: String
}

export default model<IUser>('User', schema); // EXPORT THE MODEL