import express from 'express';

const securityRouter = express.Router();

function isAuthenticated (request, response, next) {
    if (request.isAuthenticated()) {
        next();
    } else {
        console.warn(`SecurityRouter.isAuthenticated: Unautorized access attempt.`);
        response.status(400).end();
    }
}

securityRouter.all('/api/profile/*', isAuthenticated);

export default securityRouter;
