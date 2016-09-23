// views
import Base from 'views/base';

// actions
import * as RouterActions from 'router/actions';
import * as ProfileActions from 'actions/profile';

import './_home.styl';

export default class Home extends Base {

    initialize(container, options) {
        super.initialize(container, options);
        this.signInButton;
        this.signUpButton;
        this.submitButton;

        return Promise.resolve();
    }

    preRender () {
        this.data.error = '';
        this.data.info = '';
        this.data.username = '';
        return super.preRender();
    }

    postRender () {
        this.signInButton = this.container.getElementsByClassName('sign-in-button')[0];
        this.signUpButton = this.container.getElementsByClassName('sign-up-button')[0];
        this.submitButton = this.container.getElementsByClassName('submit-button')[0];

        this.emailInput = this.container.getElementsByClassName('email-input')[0];

        this.signInButton.addEventListener('click', this.onSignInClick);
        this.signUpButton.addEventListener('click', this.onSignUpClick);
        this.submitButton.addEventListener('click', this.onSubmitButton);

        return super.postRender();
    }

    getTemplateData () {
        return '<div class="home">\
            <h1 class="title">Home</h1>\
            <div>\
                <label class="base-label">Input username</label>\
                <input class="email-input base-input" value="{{username}}"/>\
            </div>\
            <button class="submit-button base-button" >Submit</button>\
            <button class="sign-in-button base-button" >Sign in</button>\
            <button class="sign-up-button base-button" >Sign up</button>\
            <div class="base-label">{{info}}</div>\
            <div class="error-label">{{error}}</div>\
        </div>';
    }

    // handlers
    onSignInClick = () => {
        RouterActions.navigateToSignIn();
    };

    onSignUpClick = () => {
        RouterActions.navigateToSignUp();
    };

    onSubmitButton = () => {
        const email = this.emailInput.value;
        this.data.username = email;
        ProfileActions.getInfo(email).then(this.getInfoSuccess).catch(this.getInfoFail);
    };

    getInfoSuccess = (data) => {
        this.data.error = '';
        this.data.info = data.privateData.message;

        this.update();
    };

    getInfoFail = () => {
        this.data.info = '';
        this.data.error = 'Current user is unauthentificated.';

        this.update();
    };

}
