import Navigo from 'navigo';

const router = new Navigo(null, true);

router
    .on({
        '/home': () => {
            console.log('render home');
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
