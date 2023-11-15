import express from 'express';
import { GetUserInfo } from './controladores/UsuariosController.js';

const router = express.Router();
router.post('/',GetUserInfo);
export default router;