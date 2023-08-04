import express from 'express';
import productController from '../controllers/product.controller';
import upload from '../utils/multer';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/:id', productController.findById);
router.get('/', productController.findAll);
router.post('/', verifyAdmin, upload.single('image'), productController.create);
router.put('/:id', verifyAdmin, upload.single('image'), productController.update);
router.delete('/:id', verifyAdmin, productController.delete);

export default router
