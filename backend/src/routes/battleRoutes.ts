import express from 'express';
import { createBattle, getBattles, getBattle, voteBattle, deleteBattle } from '../controllers/battleController';
import upload from '../middleware/upload';
import { protect } from '../middleware/auth';

const router = express.Router();

// Kapışma oluşturma - dosya alanlarını belirt
router.post('/', protect, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'optionImages', maxCount: 128 }
]), createBattle);

// Tüm kapışmaları getirme
router.get('/', getBattles);

// Tek bir kapışmayı getirme
router.get('/:id', getBattle);

// Kapışmaya oy verme
router.post('/:id/vote', protect, voteBattle);

// Kapışmayı silme
router.delete('/:id', protect, deleteBattle);

export default router; 