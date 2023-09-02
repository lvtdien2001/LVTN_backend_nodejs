import express from 'express';
import paymentController from '../controllers/payment.controller';

const router = express.Router();

router.get('/vnp_ipn', paymentController.checksum);
router.post('/create-vnp-url', paymentController.createVnpUrl);

export default router
