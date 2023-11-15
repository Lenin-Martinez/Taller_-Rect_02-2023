import express from 'express';
import { GetAll,GetPiezasByDepartament,
    GetPiezasByCategory, 
    GetPiezasByCategoryDepartament,
    GetPiezaById, 
    PostCotizacion,
    PutCompra} from './controladores/MarketController.js';
const router = express.Router();

router.get('/',GetAll );
router.get('/Departamento',GetPiezasByDepartament);
router.get('/Id',GetPiezaById);
router.get('/Categoria',GetPiezasByCategory);
router.get('/CategoriaDepartamento',GetPiezasByCategoryDepartament);
router.post('/Cotizacion',PostCotizacion)
router.put('/Compra',PutCompra)
export default router;

//todo El carrito debera ser manejado en el front es decir, ahi mismo agregar o quitar cosas
///! el front deberá enviarme los id de cada elemento, CANTIDAD DE CADA ELEMENTO, el precio total esta cotizacion 
//! deberá ser en un procedimiento almacenado, primero en el procedimiento genero la row de cotizacion 
//! con ese ID de cotizacion se hara el insert a la tabla CotizacionPiezas
//?HASTA QUE se haga la compra se hara un update a la tabla piezas para disminuir la cantida de piezas
/*

{
  "cotizacion": {
    "Costo":20.0
  },
  "piezas": [
    {
      "piezaID": 1,
      "cantidad": 5
    },
    {
      "piezaID": 2,
      "cantidad": 5
    }
  ]
}
*/