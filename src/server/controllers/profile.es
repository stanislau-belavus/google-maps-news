import * as ProfileActions from '../actions/profile';

import { ProfileRole } from '../constants/profile';

export const profileInfo = (req, res) => {
    console.log('ProfileController.profileInfo');

    const { username } = req.params;
    const user = req.user;

    console.log(`ProfileController.profileInfo username: ${username}`);
    console.log(`ProfileController.profileInfo user.name: ${user.username}`);
    console.log(`ProfileController.profileInfo role: ${user.role}`);

    if (user.role !== ProfileRole.ADMIN && user.username !== username) {
        console.warn('ACCESS DENIED');
        return res.status(400).json({
            code: 401,
            message: 'ACCESS DENIED',
        });
    }

    ProfileActions.findByUserName(username).then((user) => {
        res.json({
            privateData: user.privateData
        });
    });

}
