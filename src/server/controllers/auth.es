// actions
import * as ProfileActions from '../actions/profile';

// constants
import * as AuthConstants from '../constants/auth';

// security
import NodeRSA from 'node-rsa';
import randomString from 'randomstring';

export const preLogin = (req, res) => {
    console.log('AuthController.preLogin');

} 

export const login = (req, res) => {
    console.log('AuthController.login');

}

let preRegisterMap = {};

const addToPreRegisterMap = (username, key, serverRSAKey) => {
    let removeUserFromMapId = setTimeout(() => {
        preRegisterMap[username].clear();
    }, AuthConstants.PRE_REGISTER_TIMEOUT);

    preRegisterMap[username] = {
        key,
        serverRSAKey,
        clear: () => {
            clearTimeout(removeUserFromMapId);

            preRegisterMap[username] = null;
            delete preRegisterMap[username];
        }
    };
}

export const preRegister = (req, res) => {
    console.debug('AuthController.preRegister');

    // username - String
    // clientPublicKey - client public RSA key
    const { username, key } = req.body;
    console.debug(`AuthController.preRegister: username = ${username}, clientPublicKey = ${key}`);

    if (!username) {
        res.status(400).json({ message: 'fuck you loser' }).end();

        console.warn('AuthController.preRegister: no username passed');
        return;
    }

    if (preRegisterMap[username]) {
        res.status(400).json({ message: 'fuck you loser' }).end();

        console.warn('AuthController.preRegister: current user already preRegistered');
        return;
    }

    ProfileActions.findByUserName(username)
        .then(() => {
            res.status(404).json({ message: 'fuck you loser' }).end();

            console.warn('AuthController.preRegister: current user already registered');
        })
        .catch(() => {
            console.debug(`AuthController.preRegister: start preRegestration`);
            const rsa = new NodeRSA(); // create empty rsa key

            var serverRSAKey = new NodeRSA({b: 512}); // create new rsa key
            const publicServerKey = serverRSAKey.exportKey('public');

            const passwordKey = randomString.generate();

            rsa.importKey(key, 'public');

            const encryptedPasswordKey = rsa.encrypt(passwordKey, 'base64');
            const encryptedRSAServerPublicKey = rsa.encrypt(publicServerKey, 'base64');

            addToPreRegisterMap(username, passwordKey, serverRSAKey);

            console.debug(`AuthController.preRegister: pre Registration success`);

            res.status(200).json({
                encryptedPasswordKey,
                encryptedRSAServerPublicKey
            }).end();
        }).catch((error) => {
            console.warn('AuthController.preRegister: something went wrong with preRegister');
            console.warn(error);
        });
}

export const register = (req, res) => {
    console.log('AuthController.register');

    // username - String
    // password - encrypted by server rsa hash(pwd, hashKey)
    // message - an security information

    const { username, password, message } = req.body;

    console.debug(`AuthController.register: username = ${username}, password = ${password}, message = ${message}`);

}

export const logout = (req, res) => {
    console.log('AuthController.logout');

}
