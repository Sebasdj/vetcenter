import { Router } from 'express'
import { loginUser, refreshToken } from '../controllers/login.controler'

const router = Router();

router.post('/login', loginUser);
router.get('/refresh_token', refreshToken);

export default router;
