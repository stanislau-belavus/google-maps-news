import nconf from 'nconf';
import Promise from 'bluebird';
import { MONGO_ENV } from '../constants/env';

export const setup = () => {
    console.log('setup mongo');

    return Promise.resolve();
}
