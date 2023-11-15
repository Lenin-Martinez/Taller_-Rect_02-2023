import express from 'express';
import { Bienvenido } from './controladores/BaseController.js';
const router = express.Router();

router.get('/', Bienvenido);

export default router;