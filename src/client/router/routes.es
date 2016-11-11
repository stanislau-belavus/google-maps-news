import Navigo from 'navigo';

import * as Renderer from 'renderer';

// views
import Home from 'views/home/home';
import SignIn from 'views/sign_in/sign_in';
import SignUp from 'views/sign_up/sign_up';
import OAuth2 from 'views/oauth2/oauth2';

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
        // [ROUTES.GOOGLE_AUTH]: (param, query) => {
        //     console.log('query', param, query);
        //     // access_token=ya29.Ci-TA9pllgMe6U6zeBgO-DPcQR3NYLBi5yPCSrJ7pVkLlwcXrVD0OWkU9EkKRTcinw&token_type=Bearer&expires_in=3600
        //     Renderer.render(new OAuth2(), viewOptions);
        // }
    })
    .on(ROUTES.GOOGLE_AUTH, (param, query) => {
            console.log('query', param, query);
            // access_token=ya29.Ci-TA9pllgMe6U6zeBgO-DPcQR3NYLBi5yPCSrJ7pVkLlwcXrVD0OWkU9EkKRTcinw&token_type=Bearer&expires_in=3600
            Renderer.render(new OAuth2(), viewOptions);
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
