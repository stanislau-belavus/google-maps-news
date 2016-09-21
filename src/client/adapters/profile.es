import * as HttpAdapter from 'adapters/http';

export const getInfo = (username) => {
    return HttpAdapter.get(`/api/profile/info/${username}`);
}
