import * as ProfileActions from '../actions/profile';


export const profileInfo = (req, res) => {
    console.log('ProfileController.profileInfo');

    const { username } = req.params;

    console.log(`ProfileController.profileInfo username: ${username}`);

    ProfileActions.findByUserName(username).then((user) => {
        res.json({
            privateData: user.privateData
        });
    });

}
