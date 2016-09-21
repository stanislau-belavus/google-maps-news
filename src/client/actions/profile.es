import * as ProfileAdapter from 'adapters/profile';

export const getInfo = (username) => {
    return ProfileAdapter.getInfo(username);
}
