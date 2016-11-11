import Base from 'views/base';

// actions
import * as RouterActions from 'router/actions';
import * as AuthActions from 'actions/auth';

// helpers
import * as AuthHelpers from 'helpers/auth';

export default class OAuth2 extends Base {

    initialize (container) {
        const { options } = container;
        console.log(options);
        this.code = options ? options.code : null;

        super.initialize(container, options);
        
        return Promise.resolve();
    }

    preRender () {
        return super.preRender();
    }

    postRender () {
        debugger;
        console.log('FFF -- ', this.code);
        if(!this.code) {
            this.navigateToHome();
        } else {
            console.log('POST');
            AuthActions.getGoogleToken(this.code).then((data) => {
                console.log('DATa -- ', this.navigateToHome);
                this.navigateToHome(data);
            });
        }
    }

    getTemplateData () {
        return '<div class="sign_in"></div>';
    }

    navigateToHome = (data) => {
        RouterActions.navigateToHome(data);
    };
}