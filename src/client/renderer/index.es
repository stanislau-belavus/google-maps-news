import Mark from 'markup-js';

let appContainer; // global app container
let currentView = {
    unload: () => {
        return Promise.resolve();
    }
};

export const initilize = (container) => {
    appContainer = container;
}

// view should always be extender from base view
// options - data to template render
export const render = (view, options) => {
    currentView.unload().then(() => {
        view.initialize({
            container: appContainer,
            options
        }).then(() => {
            view.preRender().then(() => {
                view.render().then(() => {
                    view.postRender().then(() => {
                        currentView = view;
                    });
                });
            });
        });
    });
}

export const renderTemplate = (template, data = {}, container = appContainer) => {
    const insides = Mark.up(template, data);
    container.innerHTML = insides;
}
