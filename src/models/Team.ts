// Team model
// You can copy this file and modify it to create the other ones
import {Schema, model, Document} from 'mongoose';
import User, { IUser } from './User';

// Create a schema based on discussed
// team model:
const schema = new Schema({
    name: String,
    description: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref:User
    }],
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface ITeam extends Document {
    name: String,
    description: String,
    members: IUser['_id'];

}

export default model<ITeam>('Team', schema); // EXPORT THE MODEL