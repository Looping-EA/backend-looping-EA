import {Document, Schema, model} from 'mongoose';

const schema = new Schema({
    uname: String,
    date: String,
    message: String
});

interface IContacto extends Document{
    uname: String;
    date: String;
    message: String;
}

export default model<IContacto>('Contacto', schema);