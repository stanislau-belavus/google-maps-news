// actions
import * as AuthActions from 'actions/auth';
import * as ProfileActions from 'actions/profile';
import {
    Actions as RouterActions,
    Router,
} from 'router';

// renderer
import * as Renderer from 'renderer';

// TODO: remove it after testing
window.AuthActions = AuthActions;
window.ProfileActions = ProfileActions;
window.RouterActions = RouterActions;

window.Router = Router;
window.Renderer = Renderer

window.history.pushState('', document.title, window.location.pathname);

// initialize app
Renderer.initilize(document.getElementById('app-container'));
// RouterActions.navigateToHome();


