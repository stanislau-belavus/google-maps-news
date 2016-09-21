import Promise from 'bluebird';
import mongoose from 'mongoose';
import { DB_SETTINGS } from '../constants/env';

export const setup = (app) => {
    return new Promise((resolve, reject) => {
        if (app.mongo) {
            mongoose.connection.close();
            app.mongo = null;
        }

        mongoose.connect(DB_SETTINGS.uri, DB_SETTINGS.options);
        mongoose.connection.once('open', () => {
            console.log('CONNECTION SUCCESS');
            app.mongo = mongoose.connection;
        });

        mongoose.connection.on('error', (error) => {
            console.log('ERROR CONNECTION -- ', error.message);
            reject();
        });
    });
}
