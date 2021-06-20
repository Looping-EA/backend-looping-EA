import {Document, Schema, model} from 'mongoose';

const schema = new Schema({
    uname: String,
    latitude: String,
    longitude: String
});

interface ILocation extends Document{
    uname: String;
    latitude: String;
    longitude: String;
}

export default model<ILocation>('Location', schema);