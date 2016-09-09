import express from 'express';
import Promise from 'bluebird';

// server middleware
import { setup as setupExpress } from './middleware/express';
import { setup as setupMongo } from './middleware/mongo';

const app = express();

Promise.all([
    setupExpress(app),
    setupMongo(app),
]).then(() => {
    console.log('SERVER STARTED');
});
