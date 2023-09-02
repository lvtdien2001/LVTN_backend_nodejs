import express from 'express';
import orderController from '../controllers/order.controller';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/by-user', orderController.findByUser);
router.get('/:id', orderController.findById);
router.get('/', verifyAdmin, orderController.findAll);
router.post('/', orderController.create);
router.put('/status/:id', orderController.updateStatus);
router.put('/cash/:id', orderController.updatePaymentStatus);
router.put('/address/:id', orderController.updateAddress);

export default router
