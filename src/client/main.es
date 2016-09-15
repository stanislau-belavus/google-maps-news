import superagent from 'superagent';

import * as AuthActions from 'actions/auth';

// TODO: remove it after testing
window.AuthActions = AuthActions;
/*
 use can test it via broswer console:
```
AuthActions.register('loks', '1234', 'loks message').then(() => {
    console.log('Registration for "loks"` completed!');
});
```
*/

export default function() {
    console.log('hello function!!');

    superagent
            .post(`http://localhost:8081/api/example_post`)
            .send({
                message: 'hello, dear, '
            })
            .end((error, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(response.body);
                }
            });

    superagent
            .get(`http://localhost:8081/api/example_get/fuck`)
            .send()
            .end((error, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(response.body);
                }
            });

    superagent.get('http://localhost:8081/api/profile/info/bob').send().end((error, res) => {
        if (!error) {
            console.log(res.body);
        }
    });
}