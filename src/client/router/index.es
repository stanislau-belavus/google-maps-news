import Navigo from 'navigo';

import * as Renderer from 'renderer';

// views
import Home from 'views/home/home';

const router = new Navigo(null, true);

router
    .on({
        '/home': () => {
            // TODO: get options data from model
            Renderer.render(new Home(), { name: 'nigger' });
        },
        '/login': () => {
            console.log('render login');
        },
        '/register': () => {
            console.log('render register');
        },
        '/logot': () => {
            console.log('render logout');
        }
    })
    .resolve();

router.notFound(() => {
    router.navigate('/home');
});

export default router;
