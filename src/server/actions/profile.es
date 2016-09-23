import Promise from 'bluebird';
import { Profile } from '../model';

export const save = (username, passwordHash, privateKey, privateData={}) => {
    return Profile.saveProfile({
        username,
        passwordHash,
        privateKey,
        privateData
    });
}

export const remove = (id) => {
    return Profile.removeById(id);
}

export const findByUserName = (username) => {
    return Profile.findByUserName(username);
}

export const findById = (id) => {
    return Profile.findById(id);
}

export const getInfo = (id) => {
    return Profile.getInfo(id);
}
