import superagent from 'superagent';

export default function() {
    console.log('hello function!!');

    superagent
            .post(`http://localhost:8081/example_post`)
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
            .get(`http://localhost:8081/example_get/fuck`)
            .send()
            .end((error, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(response.body);
                }
            });

    superagent.get('http://localhost:8081/profile/info/bob').send().end((error, res) => {
        if (!error) {
            console.log(res.body);
        }
    });
}
