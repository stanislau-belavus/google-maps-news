import * as AuthActions from 'actions/auth';
import * as ProfileActions from 'actions/profile';

// router
import router from 'router';

// TODO: remove it after testing
window.AuthActions = AuthActions;
window.ProfileActions = ProfileActions;

window.router = router;

ProfileActions.getInfo('loks');
