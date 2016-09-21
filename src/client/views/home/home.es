import Base from 'views/base';

import './_home.styl';

export default class Home extends Base {

    preRender () {
        this.data.name = this.options.name || 'base_name';
        return super.preRender();
    }

    getTemplateData () {
        return '<div class="home">Hello, {{name}}!</div>';
    }

}
