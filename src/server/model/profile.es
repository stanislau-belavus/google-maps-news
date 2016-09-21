'use strict';

import mongoose, { Schema } from 'mongoose';
import timestamp from 'mongoose-timestamp';

const ProfileSchema = new Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    privateKey: { type: String, required: true },
    privateData: { type: Object, default: { } },
});

ProfileSchema.set('toObject', { virtuals: true });
ProfileSchema.set('toJSON', { virtuals: true });

ProfileSchema.plugin(timestamp);

ProfileSchema.statics.saveProfile = function(condition) {
    return new Promise((resolve, reject) => {
        const newProfile = new this(condition);
        newProfile.save((error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
};

ProfileSchema.statics.removeById = (condition) => {};

ProfileSchema.statics.findByUserName = (condition) => {};

ProfileSchema.statics.findById = (condition) => {};

ProfileSchema.statics.getInfo = (condition) => {};

export default mongoose.model('Profile', ProfileSchema);