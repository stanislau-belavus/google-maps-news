import mongoose from 'mongoose';
import Promise from 'bluebird';

import Profile from './profile';

// Use native promises
mongoose.Promise = Promise;

export {
    Profile,
}