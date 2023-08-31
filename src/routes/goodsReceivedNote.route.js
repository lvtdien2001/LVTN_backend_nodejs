import express from 'express';
import goodsReceivedNoteController from '../controllers/goodsReceivedNote.controller';

const router = express.Router();

router.get('/:id', goodsReceivedNoteController.findById);
router.get('/', goodsReceivedNoteController.findAll);
router.post('/', goodsReceivedNoteController.create);
router.put('/:id', goodsReceivedNoteController.update);
router.delete('/:id', goodsReceivedNoteController.delete);

export default router
