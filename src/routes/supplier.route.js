import express from 'express';
import supplierController from '../controllers/supplier.controller';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/:id', verifyAdmin, supplierController.findById);
router.get('/', verifyAdmin, supplierController.findAll);
router.post('/', verifyAdmin, supplierController.create);
router.put('/:id', verifyAdmin, supplierController.update);
router.delete('/:id', verifyAdmin, supplierController.delete);

export default router
