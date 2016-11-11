import Promise from 'bluebird';
import path from 'path';
import express from 'express';

// security
import passport from 'passport';

// express helper modules
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// constants
import { EXPRESS_PORT, SECRET } from '../constants/env';

// routes
import staicRouter from '../routes/static';
import apiRouter from '../routes/api';
import securityRouter from '../routes/security';

// security strategies
import setupLocalStrategy from '../passport_strategies/local';

export const setup = (app) => {

    return new Promise((resolve, reject) => {
        app.set('port', EXPRESS_PORT);

        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", true);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        // body parser for http get/post requests
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        //for passport middlewares
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(expressSession({
            secret: SECRET,
            resave: true,
            saveUninitialized: true,
        }));

        // passport
        setupLocalStrategy();
        app.use(passport.initialize());
        app.use(passport.session());

        // view engine
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '../views'));

        // route configuration
        app.use(securityRouter);
        app.use(apiRouter);
        app.use(staicRouter);
        app.use(express.static(path.join(__dirname, '../../../')));

        app.listen(EXPRESS_PORT, () => {
            console.log('EXPRESS READY');
            resolve();
        });
    });
}
