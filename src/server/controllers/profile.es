import * as ProfileActions from '../actions/profile';


export const profileInfo = (req, res) => {
    console.log('ProfileController.profileInfo');

    const { username } = req.params;

    console.log(`ProfileController.profileInfo username: ${username}`);

    const user = ProfileActions.findByUserName(username);

    res.json({
        message: user && ProfileActions.getInfo(user)
    });
}
