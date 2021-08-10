import mongoose from 'mongoose'
import {config} from '../config/config'

//mongoose is library FXN that connect to monoDB
export const connect = () => {
    return (mongoose.connect("mongodb://localhost:27017/songs",
        {useNewUrlParser: true, useUnifiedTopology: true},
        (err) => {
            if (err) {
                console.error('Error :' + err);
            } else {
                console.log('Connected to Mongodb Database which is local');
            }
        }
    ),
    mongoose.set('useCreateIndex', true))

}
