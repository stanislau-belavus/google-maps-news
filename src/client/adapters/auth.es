import * as HttpAdapter from 'adapters/http';

export const preRegister = (username, rsaPublicKey) => {
    return HttpAdapter.post('/api/pre_register', {
        username,
        key: rsaPublicKey
    });
}

export const register = (username, password, privateData) => {
    return HttpAdapter.post('/api/register', {
        username,
        password,
        privateData
    });
}

export const preLogin = (username, rsaPublicKey) => {
    return HttpAdapter.post('/api/pre_login', {
        username,
        key: rsaPublicKey
    })
}

export const login = (username, password) => {
    return HttpAdapter.post('/api/login', {
        username,
        password
    })
}

export const logout = (username) => {
    HttpAdapter.post('/api/logout', {
        username
    });
}

export const googleLogin = () => {
    HttpAdapter.post('/api/googleLogin', {})
    .then((data) => {
        const { redirect } = data;
        window.location= redirect;
    });
}

export const getGoogleToken = (code) => {
    return HttpAdapter.post('/api/googleToken', { code });
}
