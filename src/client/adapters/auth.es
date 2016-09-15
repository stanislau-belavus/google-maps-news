import * as HttpAdapter from 'adapters/http';

export const preRegister = (username, rsaPublicKey) => {
    return HttpAdapter.post('/api/pre_register', {
        username,
        key: rsaPublicKey
    });
}

export const register = (username, password, message) => {
    return HttpAdapter.post('/api/register', {
        username,
        password,
        message
    });
}
