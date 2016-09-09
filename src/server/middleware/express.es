import Promise from 'bluebird';

import { EXPRESS_PORT } from '../constants/env';

export const setup = (app) => {

    return new Promise((resolve, reject) => {
        app.set('port', EXPRESS_PORT);
        

        resolve();
    });
}
