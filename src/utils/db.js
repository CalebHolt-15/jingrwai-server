import mongoose from 'mongoose'
import {config} from '../config/config'

export const connect = (url = config.dbUrl, opts = {}) => {
    return mongoose.connect(
        url,
        { ...opts, useNewUrlParser: true, useUnifiedTopology: true  },
        (err) => {
            if (err) {
                console.error('Error :' + err);
            } else {
                console.log('DB: connected');
            }
        }
    )


}
