import {Schema, model, Document} from 'mongoose';

// create schema
const schema = new Schema({
    name: String,
    desc: String
});

// Interface Insignia
export interface IInsignia extends Document{
    name: String;
    desc: String;
}

// Export the model
export default model<IInsignia>('Insignia', schema);