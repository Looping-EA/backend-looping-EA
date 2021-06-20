import {Document, Schema, model} from 'mongoose';

const schema = new Schema({
    uname: String,
    notificaciones: String,
    seguridad: String,
    privacidad: String
});

interface IConfiguracion extends Document{
    uname: String;
    notificaciones: String;
    seguridad: String;
    privacidad: String;
}

export default model<IConfiguracion>('Configuracion', schema);