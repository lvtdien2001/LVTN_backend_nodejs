import express from 'express';
import userController from '../controllers/user.controller';
import verifyAdmin from '../middleware/verifyAdmin';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', verifyAdmin, userController.findAll);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.put('/update-avatar/:id', upload.single('image'), userController.updateAvatar);
router.put('/disable/:id', verifyAdmin, userController.disableUser);

export default router
