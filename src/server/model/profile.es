'use strict';

import async from 'async';
import timestamp from 'mongoose-timestamp';
import mongoose, { Schema } from 'mongoose';

const ProfileSchema = new Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    privateKey: { type: String, required: true },
    privateData: { type: Object, default: { } },
});

ProfileSchema.set('toObject', { virtuals: true });
ProfileSchema.set('toJSON', { virtuals: true });

ProfileSchema.plugin(timestamp);

ProfileSchema.statics.saveProfile = function(data={}) {
    return new Promise((resolve, reject) => {
        async.waterfall([(cb) => {
            this.findOne({ username: data.username }).exec(cb);
        }, (profile, cb) => {
            if(!profile) {
                const newProfile = new this(data);
                newProfile.save((error) => { cb(error); }); 
            }
            else {
                cb('This profile already exist!'); 
            }
        }], (error) => {
            if (!error) {
                resolve();
            } else {
                reject(error);
            }
        })
    });
};

ProfileSchema.statics.removeById = function (id) {
    return new Promise((resolve, reject) => {
        this.remove({ _id: id }, (error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
};

ProfileSchema.statics.findByUserName = function (username) {
    return new Promise((resolve, reject) => {
        async.waterfall([(cb) => {
            this.findOne({ username }).exec(cb);
        }], (error, data) => {
            if (!error && !!data) {
                resolve(data);
            } else {
                reject(error);
            }
        })
    });
};

ProfileSchema.statics.findById = function (id) {
    return new Promise((resolve, reject) => {
        async.waterfall([(cb) => {
            this.findOne({ _id: id }).exec(cb);
        }], (error, data) => {
            if (!error && !!data) {
                resolve(data);
            } else {
                reject(error);
            }
        })
    });
};

ProfileSchema.statics.getInfo = function (id) {
    return new Promise((resolve, reject) => {
        async.waterfall([(cb) => {
            this.findOne({ _id: id }).exec(cb);
        }], (error, data) => {
            if (!error) {
                resolve(data.privateData);
            } else {
                reject(error);
            }
        })
    });
};

export default mongoose.model('Profile', ProfileSchema);