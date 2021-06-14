import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    quest: String,
    resp: String,
});

// create an interface that contains all
// same info of the schema:
// (also its hereditary from the Document of MongoDB
// this means that it will have all the other important
// fields like ObjectId() = _id)
export interface IFaq extends Document {
    quest: String;
    resp: String;

}

export default model<IFaq>('Faq', schema); // EXPORT THE MODEL