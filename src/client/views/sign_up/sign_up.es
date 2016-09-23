import './_sign_up.styl';

// views
import Base from 'views/base';

// actions
import * as RouterActions from 'router/actions';
import * as AuthActions from 'actions/auth';

// helpers
import * as AuthHelpers from 'helpers/auth';

export default class SignUp extends Base {

    initialize (container, options) {
        super.initialize(container, options);

        // handlers
        this.submitButton;
        this.homeButton;

        // data labels
        this.emailInput;
        this.passwordInput;
        this.repeatPasswordInput;

        return Promise.resolve();
    }

    preRender () {
        this.data.error = '';
        this.data.email = '';
        this.data.repeatPassword = '';
        this.data.password = '';
        return super.preRender();
    }

    postRender () {
        this.submitButton = this.container.getElementsByClassName('submit-button')[0];
        this.homeButton = this.container.getElementsByClassName('home-button')[0];

        this.emailInput = this.container.getElementsByClassName('email-input')[0];
        this.passwordInput = this.container.getElementsByClassName('password-input')[0];
        this.repeatPasswordInput = this.container.getElementsByClassName('repeat-password-input')[0];

        // set handlers
        this.submitButton.addEventListener('click', this.submit);
        this.homeButton.addEventListener('click', this.navigateToHome);

        return super.postRender();
    }

    getTemplateData () {
        return '<div class="sign_up">\
            <h2>Sign up</h2>\
            <div>\
                <label class="base-label">Email</label>\
                <input class="email-input base-input" value="{{email}}"/>\
            </div>\
            <div>\
            <label class="base-label">Password</label>\
            <input class="password-input base-input" type="password" value="{{password}}" />\
            </div>\
            <div>\
            <label class="base-label">Repeat password</label>\
            <input class="repeat-password-input base-input" type="password"  value="{{repeatPassword}}" />\
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
        const repeatPassword = this.repeatPasswordInput.value;

        this.data.email = email;

        if (!email || !AuthHelpers.validateEmail(email)) {
            this.data.error = 'Incorrect email.';
            this.update();
            return;
        }

        if (!password || !repeatPassword) {
            this.data.error = 'One of your password fields is empty.';
            this.update();
            return;
        }

        if (password !== repeatPassword) {
            this.data.error = 'Please, type a same passwords.';
            this.update();
            return;
        }

        this.data.error = '';
        this.data.password = password;
        this.data.repeatPassword = repeatPassword;
        this.update();

        // send register
        AuthActions.register(email, password, { message: 'Secret '}).then(this.successRegister).catch(this.failRegister);
    };

    successRegister = () => {
        RouterActions.navigateToHome();
    };

    failRegister = () => {
        this.data.error = 'An error.';
        this.data.password = '';
        this.data.repeatPassword = '';
        this.update();
    };

    navigateToHome = () => {
        RouterActions.navigateToHome();
    };
}
