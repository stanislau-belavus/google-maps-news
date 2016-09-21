import './_sign_up.styl';

// views
import Base from 'views/base';

// actions
import * as RouterActions from 'router/actions';

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
                <input class="email-input base-input" />\
            </div>\
            <div>\
            <label class="base-label">Password</label>\
            <input class="password-input base-input" type="password"/>\
            </div>\
            <div>\
            <label class="base-label">Repeat password</label>\
            <input class="repeat-password-input base-input" type="password" />\
            </div>\
            <button class="submit-button base-button">Submit</button>\
            <button class="home-button base-button">Home</button>\
            </div>';
    }

    // handlers
    submit = () => {
        console.log(this.emailInput.value);
        console.log(this.passwordInput.value);
        console.log(this.repeatPasswordInput.value);
    };

    navigateToHome = () => {
        RouterActions.navigateToHome();
    };
}
