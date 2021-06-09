// Message model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import User, { IUser } from './User';

// Create a schema based on discussed
// message model:
const schema = new Schema({

});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IMessage extends Document {


}

export default model<IMessage>('Message', schema); // EXPORT THE MODEL