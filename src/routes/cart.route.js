import express from 'express';
import cartController from '../controllers/cart.controller';

const router = express.Router();

router.get('/count', cartController.countProducts);
router.get('/:id', cartController.findById);
router.get('/', cartController.findAll);
router.post('/', cartController.create);
router.put('/:id', cartController.update);
router.delete('/:id', cartController.delete);
router.delete('/', cartController.deleteAll);

export default router
