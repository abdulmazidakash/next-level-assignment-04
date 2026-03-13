import express from 'express';
import { AuthController } from './auth.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post('/register', AuthController.createUser);
router.post('/login', AuthController.loginUser);
router.get('/me',auth(UserRole.admin, UserRole.provider, UserRole.customer), AuthController.getMe);


export const AuthRoutes = router;
