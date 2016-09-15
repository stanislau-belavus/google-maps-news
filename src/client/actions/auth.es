import NodeRSA from 'node-rsa';
import cryptoJS from 'crypto-js';

// adapters
import * as AuthAdapter from 'adapters/auth';

// AFTER REGISTER USER SHOULD LOGIN TO GET AN ACCESS
export const register = (username, password, message) => {
    const rsa = new NodeRSA({
        b: 512,
    });
    const key = rsa.exportKey('public');

    return AuthAdapter.preRegister(username, key).then(({ encryptedPasswordKey, encryptedRSAServerPublicKey }) => {
        const hashKey = rsa.decrypt(encryptedPasswordKey, 'utf8');
        const hashedPassword = cryptoJS.HmacSHA512(password, hashKey).toString();

        const rsaServer = new NodeRSA(); // create empty rsa key
        rsaServer.importKey(rsa.decrypt(encryptedRSAServerPublicKey, 'utf8'), 'public');

        return AuthAdapter.register(username, rsaServer.encrypt(hashedPassword, 'base64'), message);
    });
}
