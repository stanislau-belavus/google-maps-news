import Promise from 'bluebird';
import { Profile } from '../model';

let mockStore = {
    bob: {
        id: 'bob',
        username: 'bob',
        passwordHash: 123,
        privateKey: '123',
        privateData: '',
        message: 'bob is not a nigger!'
    }
};

// TODO implement it using DB

export const save = (username, passwordHash, privateKey, privateData={}) => {
    return Profile.saveProfile({
        username,
        passwordHash,
        privateKey,
        privateData
    });
}

export const remove = (id) => {
    return ProfileActions.removeById(id);
}

export const findByUserName = (username) => {
    console.log(`ProfileActions.findByUserName username = ${username}`);

    return new Promise((resolve, reject) => {
        const user = mockStore[username];
        if (user) {
            resolve(user);
        } else {
            reject();
        }
    });

}

export const findById = (id) => {
    console.log(`ProfileActions.findById id = ${id}`);

    return new Promise((resolve, reject) => {
        const user = mockStore[id];
        if (user) {
            resolve(user);
        } else {
            reject();
        }
    });
}

export const getInfo = (id) => {
    console.log(`ProfileActions.getInfo id = ${id}`);
    return mockStore[id].message;
}
