import {Schema, model, Document} from 'mongoose';
import User, { IUser } from './User';

const schema = new Schema({
    message: String,
    user:String,
    project:String
});
// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface INotification extends Document {
    message: String;
    user: String;
    project:String;
}

export default model<INotification>('Notification', schema); // EXPORT THE MODEL