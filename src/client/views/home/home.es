// views
import Base from 'views/base';

// actions
import * as RouterActions from 'router/actions';

import './_home.styl';

export default class Home extends Base {

    initialize(container, options) {
        super.initialize(container, options);
        this.signInButton;
        this.signButtonButton;

        return Promise.resolve();
    }

    preRender () {
        this.data.name = this.options.name || 'base_name';
        return super.preRender();
    }

    postRender () {
        this.signInButton = this.container.getElementsByClassName('sign_in_button')[0];
        this.signUpButton = this.container.getElementsByClassName('sign_up_button')[0];

        this.signInButton.addEventListener('click', this.onSignInClick);
        this.signUpButton.addEventListener('click', this.onSignUpClick);

        return super.postRender();
    }

    getTemplateData () {
        return '<div class="home">\
            <button class="sign_in_button" >Sign in</button>\
            <button class="sign_up_button" >Sign up</button>\
        </div>';
    }

    // handlers
    onSignInClick = () => {
        RouterActions.navigateToSignIn();
    };

    onSignUpClick = () => {
        RouterActions.navigateToSignUp();
    };

}
