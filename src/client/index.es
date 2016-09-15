import * as AuthActions from 'actions/auth';
import * as ProfileActions from 'actions/profile';

// router
import router from 'router';

// renderer
import * as Renderer from 'renderer';

// TODO: remove it after testing
window.AuthActions = AuthActions;
window.ProfileActions = ProfileActions;

window.router = router;
window.Renderer = Renderer

ProfileActions.getInfo('loks');

// initialize app
Renderer.initilize(document.getElementById('app-container'));
