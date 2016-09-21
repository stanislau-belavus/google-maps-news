import superagent from 'superagent';

// method should looks like: /pre_login
export const post = (method, body = {}) => {
    return new Promise((resolve, reject) => {
        superagent
            .post(`http://localhost:8081${method}`)
            .send(body)
            .end((error, response) => {
                if (error) {
                    console.error(error)
                    reject(error);;
                } else {
                    console.log(response.body);
                    resolve(response.body);
                }
            });
    });
}

// method should looks like: /profile/info/${username}
export const get = (method) => {
    return new Promise((resolve, reject) => {
        superagent
            .get(`http://localhost:8081${method}`)
            .send()
            .end((error, response) => {
                if (error) {
                    console.error(error)
                    reject(error);;
                } else {
                    (response.body);
                    resolve(response.body);
                }
            });
    });
}


