import express from 'express';
import goodsReceivedNoteController from '../controllers/goodsReceivedNote.controller';

const router = express.Router();

router.get('/:id', goodsReceivedNoteController.findById);
router.get('/', goodsReceivedNoteController.findAll);
router.post('/', goodsReceivedNoteController.create);

export default router
