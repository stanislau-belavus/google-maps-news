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
        renderComponent(view, options, appContainer);
    });
}

export const renderTemplate = (template, data = {}, container = appContainer) => {
    const insides = Mark.up(template, data);
    container.innerHTML = insides;
}

export const renderComponent = (view, options, container) => {
    return view.initialize({
        container,
        options
    }).then(() => {
        return view.preRender().then(() => {
            return view.render().then(() => {
                return view.postRender().then(() => {
                    currentView = view;
                });
            });
        });
    });
}
