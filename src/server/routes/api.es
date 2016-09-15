import express from 'express';

import * as AuthController from '../controllers/auth'
import * as ProfileController from '../controllers/profile';

const router = express.Router();

router.get('/api/example_get/:test', (req, res) => {
    res.json({
        message: `${req.params.test} you, nigger!`
    });
});

router.post('/api/example_post', (req, res) => {
    res.status(200).json({
        message: req.body.message + ' nigga!'
    }).end();
});

// REAL API
// sign in
router.post('/api/pre_login', AuthController.preLogin);
router.post('/api/login', AuthController.login);

// sign up
router.post('/api/pre_register', AuthController.preRegister);
router.post('/api/register', AuthController.register);

// sign out
router.post('/api/logout', AuthController.logout);

router.get('/api/profile/info/:username', ProfileController.profileInfo)

export default router;
