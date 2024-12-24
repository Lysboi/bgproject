import express from 'express';
import { createBattle } from '../controllers/battleController';
import upload from '../middleware/upload';
import { protect } from '../middleware/auth';

const router = express.Router();

// Kapışma oluşturma
router.post('/', protect, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'optionImages', maxCount: 2 }
]), createBattle);

export default router; 