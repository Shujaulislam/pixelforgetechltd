import { Router } from 'express';
import { handleLogin, handleSignup, getCurrentUser } from '../controllers/auth.controller';
import { authenticateUser } from '../middleware';

const router = Router();

// Public routes
router.post('/signup', handleSignup);
router.post('/login', handleLogin);

// Protected routes
router.get('/me', authenticateUser, getCurrentUser);

export default router;