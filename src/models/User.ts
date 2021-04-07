// User model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';

// Create a schema based on discussed
// user model:
const schema = new Schema({
    uname: String,
    pswd: String,
    email: String
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
interface IUser extends Document {
    uname: String;
    pswd: String;
    email: String
}

export default model<IUser>('User', schema); // EXPORT THE MODEL