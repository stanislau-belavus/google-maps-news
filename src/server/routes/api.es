import express from 'express';

import * as AuthController from '../controllers/auth'
import * as ProfileController from '../controllers/profile';

const router = express.Router();

// sign in
router.post('/api/pre_login', AuthController.preLogin);
router.post('/api/login', AuthController.login);

// sign up
router.post('/api/pre_register', AuthController.preRegister);
router.post('/api/register', AuthController.register);

// sign out
router.post('/api/logout', AuthController.logout);

// TEST private get
router.get('/api/profile/info/:username', ProfileController.profileInfo)

export default router;
