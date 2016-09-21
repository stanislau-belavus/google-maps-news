import * as Renderer from 'renderer';

export default class BaseView {
    initialize (options) {
        this.template = this.getTemplateData();
        this.data = options;

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
        return Promise.resolve();
    }

    // should return markup.js template that will be rendered
    getTemplateData () {
        return '<div class="base"></div>';
    }
}
