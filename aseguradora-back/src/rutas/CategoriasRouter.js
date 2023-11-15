import express from 'express';
import { GetAll } from './controladores/CategoriasController.js';

const router = express.Router();
router.get('/',GetAll );
export default router;
 