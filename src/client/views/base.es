import './_base.styl';

import * as Renderer from 'renderer';

export default class BaseView {
    initialize ({ container, options }) {
        this.container = container || {};
        this.options = options || {};

        this.data = {};
        this.template = this.getTemplateData();

        return Promise.resolve();
    }

    // some pre initialization should be here
    preRender () {
        return Promise.resolve();
    }

    render () {
        Renderer.renderTemplate(this.template, this.data);
        return Promise.resolve();
    }

    // you can add handlers and etc.
    postRender () {
        return Promise.resolve();
    }

    // clean up data and destroy listeners
    unload () {
        this.container.innerHTML = '';

        return Promise.resolve();
    }

    update () {
        this.render().then(() => {
            this.postRender();
        });
    }

    // should return markup.js template that will be rendered
    getTemplateData () {
        return '<div class="base"></div>';
    }
}
