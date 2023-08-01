import express from 'express';
import addressController from '../controllers/address.controller';

const router = express.Router();

router.get('/:id', addressController.findById);
router.get('/', addressController.findByUser);
router.post('/', addressController.create);
router.put('/:id', addressController.update);
router.put('/change-default/:id', addressController.changeDefaultAddress);
router.delete('/:id', addressController.delete);

export default router
