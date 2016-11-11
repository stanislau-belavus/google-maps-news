// views
import Base from 'views/base';

// actions
import * as RouterActions from 'router/actions';
import * as ProfileActions from 'actions/profile';
import * as AuthActions from 'actions/auth';

import './_home.styl';

export default class Home extends Base {

    initialize(container, options) {
        console.log('OPTUIONS -- ', container, options);
        super.initialize(container, options);
        this.signInButton;
        this.signUpButton;
        this.submitButton;
        this.logOutButton;

        const email = window.localStorage.getItem('email');

        this.options.email = this.options.email || email;

        this.isAuth = !!this.options.email;

        return Promise.resolve();
    }

    preRender () {
        this.data.name = this.options.name || '';
        this.data.username = this.options.email || '';
        this.data.error = '';
        this.data.info = '';
        return super.preRender();
    }

    postRender () {
        this.signInButton = this.container.getElementsByClassName('sign-in-button')[0];
        this.signUpButton = this.container.getElementsByClassName('sign-up-button')[0];
        this.submitButton = this.container.getElementsByClassName('submit-button')[0];
        this.logOutButton = this.container.getElementsByClassName('log-out-button')[0];

        this.emailInput = this.container.getElementsByClassName('email-input')[0];

        this.signInButton.addEventListener('click', this.onSignInClick);
        this.signUpButton.addEventListener('click', this.onSignUpClick);
        this.submitButton.addEventListener('click', this.onSubmitButton);
        this.logOutButton.addEventListener('click', this.onLogOutClick);

        if (this.isAuth) {

            window.localStorage.setItem('email', this.data.username || this.options.email);

            this.signInButton.classList.add('hidden');
            this.signUpButton.classList.add('hidden');
            this.logOutButton.classList.remove('hidden');
        } else {
            this.signInButton.classList.remove('hidden');
            this.signUpButton.classList.remove('hidden');
            this.logOutButton.classList.add('hidden');
        }

        return super.postRender();
    }

    getTemplateData () {
        return '<div class="home">\
            <h1 class="title">Home</h1>\
            <div>\
                <label class="base-label">Input email</label>\
                <input class="email-input base-input" value="{{username}}"/>\
            </div>\
            <div>{{name}}</div>\
            <button class="submit-button base-button" >Submit</button>\
            <button class="sign-in-button base-button" >Sign in</button>\
            <button class="sign-up-button base-button" >Sign up</button>\
            <button class="log-out-button base-button hidden" >Log out</button>\
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

    getInfoFail = (error) => {
        const errorBody = error.response.body || {};
        this.data.info = '';
        console.log(errorBody);

        if (errorBody.code === 401) {
            this.data.error = 'ACCESS DENIED.';
        } else {
            this.data.error = 'Current user is unauthentificated.';
        }

        this.update();
    };

    onLogOutClick = () => {
        AuthActions.logout(this.data.username);
        this.options.email = '';
        this.isAuth = '';

        this.data.username = '';
        this.data.info = '';

        window.localStorage.setItem('email', '');

        this.update();
    };

}
