// security
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cryptoJS from 'crypto-js';

// actions
import * as ProfileActions from '../actions/profile';

export default () => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, ({ salt }, username, password, done) => {
        console.log(`LocalStrategy: username = ${username}, password = ${password}, salt = ${salt}`);

        ProfileActions.findByUserName(username)
            .then(({ passwordHash, id }) => {
                const hashedPasswordHash = cryptoJS.HmacSHA512(passwordHash, salt).toString();

                if (hashedPasswordHash === password) {
                    console.log(`LocalStrategy: login SUCCESS.`);
                    done(null, {
                        id
                    });
                } else {
                    console.warn(`LocalStrategy: incorrect password.`);
                    done({
                        message: 'incorrect password'
                    });
                }
            })
            .catch((error) => {
                done(error);
            });
    }));

    passport.serializeUser((profile, done) => {
        console.log(`serializeUser: profile = ${JSON.stringify(profile)}`);
        done(null, profile.id);
    });

    passport.deserializeUser((id, done) => {
        console.log(`deserializeUser: id = ${id}`);

        ProfileActions.findById(id).then((profile) => {
            console.log(`deserializeUser: profile = ${JSON.stringify(profile)}`);
            done(null, profile);
        }).catch(done);
    });
}
