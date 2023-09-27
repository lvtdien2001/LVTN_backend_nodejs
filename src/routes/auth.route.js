import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/', authController.getUser)
router.post('/register', authController.register);
router.post('/check-account', authController.checkAccount);
router.post('/login-admin', authController.loginAdmin);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

export default router
