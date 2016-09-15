let mockStore = {};

// TODO implement it using DB

export const save = (username, password, secret_message) => {
    console.log(`ProfileActions.save username = ${username}`);
    mockStore[username] = {
        id: username,
        username,
        password,
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
    return mockStore[username];
}

export const findById = (id) => {
    console.log(`ProfileActions.findById id = ${id}`);
    return mockStore[id];
}

export const getInfo = (id) => {
    console.log(`ProfileActions.getInfo id = ${id}`);
    return mockStore[id].message;
}
