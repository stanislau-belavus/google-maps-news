import Base from 'views/base';

// actions
import * as RouterActions from 'router/actions';

// helpers
import * as AuthHelpers from 'helpers/auth';

export default class SignIn extends Base {

    initialize (container, options) {
        super.initialize(container, options);

        return Promise.resolve();
    }

    preRender () {
        return super.preRender();
    }

    postRender () {
        return super.postRender();
    }

    getTemplateData () {
        return '<div class="sign_in"></div>';
    }

    navigateToHome = () => {
        RouterActions.navigateToHome();
    };
}