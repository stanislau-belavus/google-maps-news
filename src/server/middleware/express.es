import Promise from 'bluebird';
import path from 'path';
import express from 'express';

import { EXPRESS_PORT } from '../constants/env';

import staicRouter from '../routes/static';

export const setup = (app) => {

    return new Promise((resolve, reject) => {
        app.set('port', EXPRESS_PORT);

        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '../views'));

        app.use(staicRouter);
        app.use(express.static(path.join(__dirname, '../../../')));

        app.listen(EXPRESS_PORT, () => {
            resolve();
        });
    });
}
