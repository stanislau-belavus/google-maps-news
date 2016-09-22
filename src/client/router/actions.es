// router
import router from './routes';

// constants
import {
    ROUTES
} from './constants';

export const navigateToHome = (options) => {
    router.navigate(ROUTES.HOME, options);
};

export const navigateToSignIn = (options) => {
    router.navigate(ROUTES.SIGN_IN, options);
};

export const navigateToSignUp = (options) => {
    router.navigate(ROUTES.SIGN_UP, options);
};

