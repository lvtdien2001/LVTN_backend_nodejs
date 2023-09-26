import express from 'express';
import otpController from '../controllers/otp.controller';

const router = express.Router();

router.post('/send', otpController.sendMail);
router.post('/check', otpController.checkOTP);

export default router
