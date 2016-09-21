import Navigo from 'navigo';

import * as Renderer from 'renderer';

// views
import Home from 'views/home/home';
import SignIn from 'views/sign_in/sign_in';
import SignUp from 'views/sign_up/sign_up';

// constants
import {
    ROUTES,
} from './constants';

const router = new Navigo(null, true);
let viewOptions;

router
    .on({
        [ROUTES.HOME]: () => {
            // TODO: get options data from model
            Renderer.render(new Home(), viewOptions);
        },
        [ROUTES.SIGN_IN]: () => {
            Renderer.render(new SignIn(), viewOptions);
        },
        [ROUTES.SIGN_UP]: () => {
            Renderer.render(new SignUp(), viewOptions);
        },
    })
    .resolve();

router.notFound(() => {
    router.navigate(ROUTES.HOME);
});

// export default router;
export default {
    navigate: (route, options = {}) => {
        viewOptions = options;
        router.navigate(route);
    }
};
