import express from 'express';
import brandController from '../controllers/brand.controller';
import upload from '../utils/multer';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/:id', brandController.findById);
router.get('/', brandController.findAll);
router.post('/', verifyAdmin, upload.single('logo'), brandController.create);
router.put('/:id', verifyAdmin, upload.single('logo'), brandController.update);
router.delete('/:id', verifyAdmin, brandController.delete);

export default router
