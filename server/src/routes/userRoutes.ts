import express from 'express';
import { register, login } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Kayıt route'u
router.post('/register', register);

// Giriş route'u
router.post('/login', login);

// Test route'u (kimlik doğrulama gerekli)
router.get('/me', auth, (req, res) => {
  res.json({ message: 'Korumalı route\'a erişim başarılı' });
});

export default router; 