import express from 'express';
import distController from '../controllers/dist.controller';

const router = express.Router();

router.get('/province', distController.getProvince);
router.get('/district', distController.getDistrict);
router.get('/ward', distController.getWard);

export default router
