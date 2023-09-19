import express from 'express';
import priceController from '../controllers/price.controller';

const router = express.Router();

router.get('/:id', priceController.findById);
router.get('/', priceController.findByProduct);
router.post('/', priceController.create);

export default router
