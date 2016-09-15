import superagent from 'superagent';

import * as AuthActions from 'actions/auth';
import * as ProfileAction from 'actions/profile';

// TODO: remove it after testing
window.AuthActions = AuthActions;
window.ProfileAction = ProfileAction;

export default function() {
    console.log('hello function!!');

    superagent.get('http://localhost:8081/api/profile/info/bob').send().end((error, res) => {
        if (!error) {
            console.log(res.body);
        }
    });
}