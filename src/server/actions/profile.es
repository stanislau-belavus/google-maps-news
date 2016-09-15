import Promise from 'bluebird';

let mockStore = {
    bob: {
        id: 'bob',
        username: 'bob',
        password: 123,
        passwordHash: 123,
        message: 'bob is not a nigger!'
    }
};

// TODO implement it using DB

export const save = (username, passwordHash, privateKey, secret_message) => {
    console.log(`ProfileActions.save username = ${username}`);
    mockStore[username] = {
        id: username,
        username,
        passwordHash,
        privateKey,
        message: secret_message
    }
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
    return mockStore[id];
}

export const getInfo = (id) => {
    console.log(`ProfileActions.getInfo id = ${id}`);
    return mockStore[id].message;
}
