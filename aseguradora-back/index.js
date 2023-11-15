import express from 'express';
import cors from 'cors';
import BaseRouter from './src/rutas/BaseRouter.js';
import MarketRouter from './src/rutas/MarketRouter.js';
import ReparacionesRouter from './src/rutas/ReparacionesRouter.js';
import DepartamentoRouter from './src/rutas/DepartamentoRouter.js'
import PiezasRouter from './src/rutas/PiezasRouter.js'
import CategoriasRouter from './src/rutas/CategoriasRouter.js'
import UsuariosRouter from './src/rutas/UsuariosRouter.js'
import ProveedorRouter from './src/rutas/ProveedorRouter.js'
import TiendaRouter from './src/rutas/TiendaRouter.js'

export const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//routes
app.use('/', BaseRouter);
app.use('/api/market',MarketRouter);
app.use('/api/piezas',PiezasRouter);
app.use('/api/reparaciones', ReparacionesRouter);
app.use('/api/departamentos',DepartamentoRouter);
app.use('/api/categorias',CategoriasRouter);
app.use('/api/usuarios',UsuariosRouter);
app.use('/api/proveedores',ProveedorRouter);
app.use('/api/tiendas',TiendaRouter);


const port = 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
