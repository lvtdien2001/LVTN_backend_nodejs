import express from 'express';
import commentController from '../controllers/comment.controller';

const router = express.Router();

router.get('/', commentController.findByProduct);
router.get('/by-user', commentController.findByUser);
router.get('/:id', commentController.findById);
router.post('/', commentController.create);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.delete);

export default router
