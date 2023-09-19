import express from 'express';
import warrantyCardController from '../controllers/warrantyCard.controller';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/:id', warrantyCardController.findById);
router.get('/', warrantyCardController.findAll);
router.post('/', verifyAdmin, warrantyCardController.create);
router.put('/:id', verifyAdmin, warrantyCardController.update);
router.delete('/:id', verifyAdmin, warrantyCardController.delete);

export default router
