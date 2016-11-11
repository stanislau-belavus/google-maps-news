import Base from 'views/base';
import './_sign_in.styl';

// actions
import * as RouterActions from 'router/actions';
import * as AuthActions from 'actions/auth';

// helpers
import * as AuthHelpers from 'helpers/auth';

export default class SignIn extends Base {

    initialize (container, options) {
        super.initialize(container, options);

        // handlers
        this.submitButton;
        this.homeButton;

        // data labels
        this.emailInput;
        this.passwordInput;

        return Promise.resolve();
    }

    preRender () {
        this.data.error = '';
        this.data.email = '';
        this.data.password = '';
        return super.preRender();
    }

    postRender () {
        this.submitButton = this.container.getElementsByClassName('submit-button')[0];
        this.homeButton = this.container.getElementsByClassName('home-button')[0];
        this.oauthGoogle = this.container.getElementsByClassName('oauth-google')[0];

        this.emailInput = this.container.getElementsByClassName('email-input')[0];
        this.passwordInput = this.container.getElementsByClassName('password-input')[0];

        // set handlers
        this.oauthGoogle.addEventListener('click', this.signInWithGoogle);
        this.submitButton.addEventListener('click', this.submit);
        this.homeButton.addEventListener('click', this.navigateToHome);

        return super.postRender();
    }

    getTemplateData () {
        return '<div class="sign_in">\
                    <h2>Sign in</h2>\
                    <div>\
                        <label class="base-label">Email</label>\
                        <input class="email-input base-input" value="{{email}}"/>\
                    </div>\
                    <div>\
                        <label class="base-label">Password</label>\
                        <input class="password-input base-input" type="password" value="{{password}}" />\
                    </div>\
                    <div class="oauth-google">G</div>\
                    <div>\
                    </div>\
                        <button class="submit-button base-button">Submit</button>\
                        <button class="home-button base-button">Home</button>\
                    <div class="error-label">{{error}}</div>\
                </div>';
    }

    // handlers
    submit = () => {
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        this.data.email = email;

        if (!email || !AuthHelpers.validateEmail(email)) {
            this.data.error = 'Incorrect email.';
            this.update();
            return;
        }

        if (!password) {
            this.data.error = 'Password field is empty.';
            this.update();
            return;
        }

        this.data.error = '';
        this.data.password = password;
        this.update();

        // send login
        AuthActions.login(email, password).then(this.successLogin).catch(this.failLogin);
    };

    signInWithGoogle = () => {
        AuthActions.googleLogin();
    };

    successLogin = () => {
        RouterActions.navigateToHome({ email: this.data.email });
    };

    failLogin = () => {
        this.data.error = 'An login error.';
        this.data.password = '';
        this.update();
    };

    navigateToHome = () => {
        RouterActions.navigateToHome();
    };
}
