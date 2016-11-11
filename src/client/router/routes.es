import Navigo from 'navigo';

import * as Renderer from 'renderer';

// views
import Home from 'views/home/home';
import SignIn from 'views/sign_in/sign_in';
import SignUp from 'views/sign_up/sign_up';
import OAuth2 from 'views/oauth2/oauth2';

import parse from 'url-parse';
// constants
import {
    ROUTES,
} from './constants';

const router = new Navigo(null, true);
let viewOptions;

router
    .on({
        [ROUTES.HOME]: () => {
            Renderer.render(new Home(), viewOptions);
        },
        [ROUTES.SIGN_IN]: () => {
            Renderer.render(new SignIn(), viewOptions);
        },
        [ROUTES.SIGN_UP]: () => {
            Renderer.render(new SignUp(), viewOptions);
        },
        [ROUTES.GOOGLE_AUTH]: () => {
            const parsedUrl = parse(window.location.href, true);
            console.log(parsedUrl);
            const code = parsedUrl && parsedUrl.query ? parsedUrl.query.code : null;
            Renderer.render(new OAuth2(), { code }); 
        }
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
