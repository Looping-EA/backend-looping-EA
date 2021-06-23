import {Schema,model,Document} from 'mongoose';

const schema = new Schema({
    imagePath: String 
});

export interface IPhoto extends Document {
    imagePath: string;
}

export default model<IPhoto>('Photo',schema);