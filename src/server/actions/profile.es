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
    Profile.saveProfile({
        username,
        passwordHash,
        privateKey,
        privateData
    });

    return Promise.resolve();
}

export const remove = (id) => {
    console.log(`ProfileActions.remove id = ${id}`);
    mockStore[id] = null;
    delete mockStore[id];
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
