import { Router } from 'express'
import { loginUser } from '../controllers/login.controler'

const router = Router();

router.post('/login', loginUser);

export default router;
