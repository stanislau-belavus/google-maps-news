import NodeRSA from 'node-rsa';
import cryptoJS from 'crypto-js';

// adapters
import * as AuthAdapter from 'adapters/auth';

// AFTER REGISTER USER SHOULD LOGIN TO GET AN ACCESS
export const register = (username, password, message) => {
    const rsa = new NodeRSA({
        b: 512,
    });
    const publicRSAClientKey = rsa.exportKey('public');

    return AuthAdapter.preRegister(username, publicRSAClientKey).then(({ encryptedPasswordKey, encryptedRSAServerPublicKey }) => {
        const hashKey = rsa.decrypt(encryptedPasswordKey, 'utf8');
        const hashedPassword = cryptoJS.HmacSHA512(password, hashKey).toString();

        const rsaServer = new NodeRSA(); // create empty rsa key
        rsaServer.importKey(rsa.decrypt(encryptedRSAServerPublicKey, 'utf8'), 'public');

        const encryptedPasswordHash = rsaServer.encrypt(hashedPassword, 'base64');

        return AuthAdapter.register(username, encryptedPasswordHash, message);
    });
}

export const login = (username, password) => {
    // preLogin = (username, rsaPublicKey)
    // login = (username, password)

    const rsa = new NodeRSA({
        b: 512,
    });
    const publicRSAClientKey = rsa.exportKey('public');

    return AuthAdapter.preLogin(username, publicRSAClientKey).then(({ encryptedPrivateKey, encryptedClientSalt }) => {
        const hashKey = rsa.decrypt(encryptedPrivateKey, 'utf8');
        const salt = rsa.decrypt(encryptedClientSalt, 'utf8');

        const hashedPassword = cryptoJS.HmacSHA512(password, hashKey).toString();
        const hashedPasswordHash = cryptoJS.HmacSHA512(hashedPassword, salt).toString();

        return AuthAdapter.login(username, hashedPasswordHash);
    });
}

export const logout = (username) => {
    return AuthAdapter.logout(username);
}
