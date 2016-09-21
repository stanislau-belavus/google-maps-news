import Base from 'views/base';

import './_home.styl';

export default class Home extends Base {

    getTemplateData () {
        return '<div class="home">Hello, {{name}}!</div>';
    }

}
