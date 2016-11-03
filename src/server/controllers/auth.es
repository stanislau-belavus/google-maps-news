// actions
import * as ProfileActions from '../actions/profile';

// constants
import * as AuthConstants from '../constants/auth';

// security
import passport from 'passport';
import NodeRSA from 'node-rsa';
import RandomString from 'randomstring';

// PRIVATE
let preLoginMap = {};
let preRegisterMap = {};

// login helper
const addToPreLoginMap = (username, salt) => {
    let removeUserFromLoginMapId = setTimeout(() => {
        preLoginMap[username].clear();
    }, AuthConstants.PRE_REGISTER_TIMEOUT);

    preLoginMap[username] = {
        salt,
        clear: () => {
            clearTimeout(removeUserFromLoginMapId);

            preLoginMap[username] = null;
            delete preLoginMap[username];
        }
    };
}

// registration helper
const addToPreRegisterMap = (username, key, serverRSAKey) => {
    let removeUserFromMapId = setTimeout(() => {
        preRegisterMap[username].clear();
    }, AuthConstants.PRE_REGISTER_TIMEOUT);

    preRegisterMap[username] = {
        key, // k1
        serverRSAKey,
        clear: () => {
            clearTimeout(removeUserFromMapId);

            preRegisterMap[username] = null;
            delete preRegisterMap[username];
        }
    };
}

// PUBLIC
export const preLogin = (req, res) => {
    console.log('AuthController.preLogin');

    // username - string
    // key - public client RSA key
    const { username, key } = req.body;

    console.log(username);

    if (!username) {
        res.status(400).json({ message: 'Text message' }).end();

        console.warn('AuthController.preLogin: no username passed');
        return;
    }

    if (preLoginMap[username]) {
        res.status(400).json({ message: 'Text message' }).end();

        console.warn('AuthController.preLogin: current user already preLogined');
        return;
    }

    ProfileActions.findByUserName(username)
        .then((user) => {
            const clientSalt = RandomString.generate();
            const privateKey = user.privateKey; // k1

            const rsa = new NodeRSA(); // create empty rsa key
            rsa.importKey(key, 'public');

            const encryptedClientSalt = rsa.encrypt(clientSalt, 'base64');
            const encryptedPrivateKey = rsa.encrypt(privateKey, 'base64');

            addToPreLoginMap(username, clientSalt);

            console.log(`AuthController.preLogin: pre login success`);

            res.status(200).json({
                encryptedClientSalt,
                encryptedPrivateKey
            }).end();
        })
        .catch(() => {
            res.status(404).json({ message: 'Text message' }).end();

            console.warn('AuthController.preLogin: not found current user');
        });

} 

export const login = (req, res) => {
    console.log('AuthController.login');

    // username - string
    // password - hashed password hash
    const { username, password } = req.body;

    if (!preLoginMap[username]) {
        res.status(400).json({ message: 'Text message' }).end();
        console.warn('AuthController.login: cannot find user in pre login map');
        return;
    }

    const clientSalt = preLoginMap[username].salt;
    preLoginMap[username].clear();

    req.salt = clientSalt; // TODO try to find an api to passing arguments to passport authenticate

    passport.authenticate('local', (error, profile) => {
        if (error) {
            console.warn(`AuthController.login: passport authenticate failed error = ${error}`);
            res.status(400).json({ message: 'Text message' }).end();
        } else if (profile) {
            return req.logIn(profile, (logInError) => {
                if (logInError) {
                    console.warn('AuthController.login: passport authenticate failed logInError');
                    res.status(400).json({ message: 'Text message' }).end();
                } else {
                    console.log('AuthController.login: login success');
                    res.status(200).end();
                }
            });
        } else {
            console.warn('AuthController.login: user not found');
            res.status(400).json({ message: 'Text message' }).end();
        }
    })(req, res);
}

export const preRegister = (req, res) => {
    console.log('AuthController.preRegister');

    // username - String
    // clientPublicKey - client public RSA key
    const { username, key } = req.body;
    console.log(`AuthController.preRegister: username = ${username}, clientPublicKey = ${key}`);

    if (!username) {
        res.status(400).json({ message: 'Text message' }).end();

        console.warn('AuthController.preRegister: no username passed');
        return;
    }

    if (preRegisterMap[username]) {
        res.status(400).json({ message: 'Text message' }).end();

        console.warn('AuthController.preRegister: current user already preRegistered');
        return;
    }

    ProfileActions.findByUserName(username)
        .then(() => {
            res.status(404).json({ message: 'Text message' }).end();

            console.warn('AuthController.preRegister: current user already registered');
        })
        .catch(() => {
            console.log(`AuthController.preRegister: start preRegestration`);
            const rsa = new NodeRSA(); // create empty rsa key

            var serverRSAKey = new NodeRSA({b: 512}); // create new rsa key
            const publicServerKey = serverRSAKey.exportKey('public');

            const passwordKey = RandomString.generate(); // k1

            rsa.importKey(key, 'public');

            const encryptedPasswordKey = rsa.encrypt(passwordKey, 'base64');
            const encryptedRSAServerPublicKey = rsa.encrypt(publicServerKey, 'base64');

            addToPreRegisterMap(username, passwordKey, serverRSAKey);

            console.log(`AuthController.preRegister: pre Registration success`);

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
    // password - encrypted by server rsa(hash(pwd, k1), serverKey)
    // privateData - an security information

    const { username, password, privateData } = req.body;

    console.log(`AuthController.register: username = ${username}, password = ${password}, privateData = ${privateData}`);

    if (preRegisterMap[username]) {
        const privateKey = preRegisterMap[username].key; // k1
        const serverRSAKey = preRegisterMap[username].serverRSAKey;

        preRegisterMap[username].clear();

        const passwordHash = serverRSAKey.decrypt(password, 'utf8');

        ProfileActions.save(
            username,
            passwordHash,
            privateKey,
            privateData
        ).then(() => {
            console.log('AuthController.register: success registration');
            res.status(200).end();
        })
         .catch(() => {
            console.warn('AuthController.register: something went wrong with save');
            res.status(400).json({ message: 'fuck you, loser!' }).end();
         });
    } else {
        console.warn('AuthController.register: not found user in pre register map');
        res.status(404).json({ message: 'fuck you, loser!' }).end();
    }

}

export const logout = (req, res) => {
    console.log('AuthController.logout');

    req.logout();
    res.status(200).end();
}
