import express, { Router } from 'express';
import { register, login, getMe, updateProfileImage } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router: Router = express.Router();

// Public routes
router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);

// Protected routes
router.get('/me', protect as express.RequestHandler, getMe as express.RequestHandler);
router.put('/profile-image', protect as express.RequestHandler, updateProfileImage as express.RequestHandler);

export default router; 