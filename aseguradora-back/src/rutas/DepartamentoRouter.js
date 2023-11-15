import express from 'express';
import { GetAll } from './controladores/DepartamentoController.js';

const router = express.Router();
router.get('/',GetAll );
export default router;
