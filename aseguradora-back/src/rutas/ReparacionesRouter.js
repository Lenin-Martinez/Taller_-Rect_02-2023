import express from 'express';
import { GetAll,GetClientes,GetMarcas,CrearReparacion,GetPorEstado,CambiarEstado,AgregarCotizacion,VerCotizaciones,VerCotizacionesId} from './controladores/ReparacionesController.js';
const router = express.Router();

router.get('/', GetAll);
router.post('/estado',GetPorEstado);
router.get('/clientes', GetClientes);
router.get('/marcas', GetMarcas);
router.post('/registrar', CrearReparacion);
router.post('/estado/cambiar', CambiarEstado);
router.post('/cotizacion', AgregarCotizacion);
router.get('/cotizacion', VerCotizaciones);
router.post('/cotizacion/id', VerCotizacionesId);

export default router;