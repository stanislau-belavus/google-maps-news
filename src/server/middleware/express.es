import Promise from 'bluebird';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
// express helper modules
import bodyParser from 'body-parser';

import { EXPRESS_PORT, SECRET } from '../constants/env';

// routes
import staicRouter from '../routes/static';
import apiRouter from '../routes/api';

export const setup = (app) => {

    return new Promise((resolve, reject) => {
        app.set('port', EXPRESS_PORT);

        //for passport middlewares
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(expressSession({
            secret: SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
            },
        }));

        // passport
        // app.use(passport.initialize());
        // app.use(passport.session());

        // view engine
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '../views'));

        // route configuration
        app.use(apiRouter);
        app.use(staicRouter);
        app.use(express.static(path.join(__dirname, '../../../')));
        

        app.listen(EXPRESS_PORT, () => {
            resolve();
        });
    });
}
