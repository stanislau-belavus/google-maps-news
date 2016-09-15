import express from 'express';

import * as AuthController from '../controllers/auth'
import * as ProfileController from '../controllers/profile';

const router = express.Router();

router.get('/example_get', (req, res) => {
    res.json({
        message: 'hello, nigger!'
    });
});

router.post('/example_post', (req, res) => {
    res.status(200).json({
        message: req.body.message + ' nigger!'
    }).end();
});

// sign in
router.post('/pre_login', AuthController.preLogin);
router.post('login', AuthController.login);

// sign up
router.post('pre_register', AuthController.preRegister);
router.post('register', AuthController.register);

// sign out
router.post('logout', AuthController.logout);

router.get('/profile', ProfileController.profileInfo)

export default router;
