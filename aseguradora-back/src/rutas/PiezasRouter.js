import express from 'express';
import { GetAll,GetCategorias, GetPiezaInfo, GetMarcas, GetProveedores, 
    GetTiendas, PostPieza, PutInactivarPieza, PutPieza } from './controladores/PiezasController.js';

const router = express.Router();
router.get('/',GetAll);
router.post('/filtroPieza',GetPiezaInfo);
router.post('/agregarPieza',PostPieza);
router.get('/Proveedores',GetProveedores);
router.get('/Categorias',GetCategorias);
router.get('/Marcas',GetMarcas);
router.get('/Tiendas',GetTiendas);
router.put('/Editar',PutPieza);
router.put('/Delete',PutInactivarPieza);
export default router;
 