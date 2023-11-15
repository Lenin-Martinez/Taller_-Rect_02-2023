import { getConnection,sql } from "../../database/conexion.js";
import { queriesClientes } from "../../database/consultas/Clientes.js";
import { queriesMarcas } from "../../database/consultas/Marcas.js";
import { queriesReparaciones } from "../../database/consultas/Reparaciones.js";
import { UploadFileToBucket } from "../../utils/CloudStorage.js";

export const GetAll = async (req, res, next) => {

  let response = {};
  try {
    const orderby = req.body.orderby || "asc";
    const ordenar = req.body.ordenar || "idReparacion";

    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesReparaciones(orderby, ordenar);

    const ressDataToFetch = await pool.request().query(generateSQL.getAll);

    if (ressDataToFetch.recordset) {
      const response = {
        codigo: "00",
        registros: ressDataToFetch.recordset,
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json(errorParamsMessage);
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const GetClientes = async (req, res, next) => {

  let response = {};
  try {
    const orderby = req.body.orderby || "asc";
    const ordenar = req.body.ordenar || "idCliente";

    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesClientes(orderby, ordenar);

    const ressDataToFetch = await pool.request().query(generateSQL.getAll);

    if (ressDataToFetch.recordset) {
      const response = {
        codigo: "00",
        registros: ressDataToFetch.recordset,
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json(errorParamsMessage);
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};


export const GetMarcas = async (req, res, next) => {

  let response = {};
  try {
    const orderby = req.body.orderby || "asc";
    const ordenar = req.body.ordenar || "idMarca";

    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesMarcas(orderby, ordenar);

    const ressDataToFetch = await pool.request().query(generateSQL.getAll);

    if (ressDataToFetch.recordset) {
      const response = {
        codigo: "00",
        registros: ressDataToFetch.recordset,
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json(errorParamsMessage);
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const CrearReparacion = async (req, res, next) => {

  let response = {};
  try {
    const orderby = req.body.orderby || "asc";
    const ordenar = req.body.ordenar || "idReparacion";

    const body = req.body;
    const imagenBase64 = body.imagen; 
    const imagenTitulo = body.imagenTitulo;

    const imagenUrl = await UploadFileToBucket(imagenBase64,imagenTitulo);

    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesReparaciones(orderby, ordenar);

    const resInsert = await pool.request()
    .input("modelo", sql.VarChar, body.modelo)
    .input("placa", sql.VarChar, body.placa)
    .input("fechaIngreso", sql.DateTime2, body.fechaIngreso)
    .input("detalles", sql.VarChar, body.detalles)
    .input("imagen", sql.VarChar, imagenUrl)
    .input("idCliente", sql.Int, body.idCliente)
    .input("idMarca", sql.Int, body.idMarca)
    .input("idTaller", sql.Int, body.idTaller)
    .input("color", sql.VarChar, body.color)
    .query(generateSQL.createReparacion);
    
    // console.log('Operacion Insert:',resInsert);
    
    if (resInsert.rowsAffected > 0) {
      const response = {
        codigo: "00",
        message: "Registro de Incidente exitoso",
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json(errorEjecucionInsercion);
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const CambiarEstado = async (req, res, next) => {

  let response = {};
  try {
    const orderby = req.body.orderby || "asc";
    const ordenar = req.body.ordenar || "idReparacion";

    const body = req.body;

    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesReparaciones(orderby, ordenar);

    const resInsert = await pool.request()
    .input("id", sql.Int, body.id)
    .input("estado", sql.VarChar, body.estado)
    .query(generateSQL.cambioEstado);
    
    // console.log('Operacion Insert:',resInsert);
    
    if (resInsert.rowsAffected > 0) {
      const response = {
        codigo: "00",
        message: `Cambio de estado exitoso, Incidente: ${body.id} ahora se encuentra: ${body.estado}`,
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json(errorEjecucionInsercion);
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const GetPorEstado = async (req, res, next) => {

  let response = {};
  try {
    const orderby = req.body.orderby || "asc";
    const ordenar = req.body.ordenar || "idReparacion";

    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesReparaciones(orderby, ordenar);
    const body = req.body;
    let query = "";
    if(body.estado === 'activo'){
      query = generateSQL.getActivos;
    }else if(body.estado === 'finalizado'){
      query = generateSQL.getFinalizados;
    }else if(body.estado === 'proceso'){
      query = generateSQL.getEnProceso;
    }else if(body.estado === 'rechazado'){
      query = generateSQL.getRechazado
    }else{
      query = generateSQL.getAll;
    }
    console.log('Query: ',query);
    const ressDataToFetch = await pool.request().query(query);

    if (ressDataToFetch.recordset) {
      const response = {
        codigo: "00",
        registros: ressDataToFetch.recordset,
      };
      return res.status(200).json(response);
    } else {
      const response = {
        codigo: "00",
        registros: {},
      };
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const AgregarCotizacion = async (req, res, next) => {

  let response = {};
  try {
    const orderby = req.body.orderby || "asc";
    const ordenar = req.body.ordenar || "IdRelacion";

    const body = req.body;

    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesReparaciones(orderby, ordenar);

    const resInsert = await pool.request()
    .input("reparacion", sql.Int, body.reparacion)
    .input("cotizacion", sql.Int, body.cotizacion)
    .query(generateSQL.agregarCotizacion);
    
    // console.log('Operacion Insert:',resInsert);
    
    if (resInsert.rowsAffected > 0) {
      const response = {
        codigo: "00",
        message: "Cotizacion registrada con exitoso",
      };
      return res.status(200).json(response);
    } else {
      return res.status(400).json(errorEjecucionInsercion);
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const VerCotizaciones = async (req, res, next) => {

    let response = {};
    try {
      const orderby = req.body.orderby || "asc";
      const ordenar = req.body.ordenar || "IdRelacion";
  
      const pool = await getConnection();
      if (!pool) return res.status(500).json(errorConnectionMessage);
  
      const generateSQL = queriesReparaciones(orderby, ordenar);
  
      const ressDataToFetch = await pool.request().query(generateSQL.verCotizaciones);
  
      if (ressDataToFetch.recordset) {
        const response = {
          codigo: "00",
          registros: ressDataToFetch.recordset,
        };
        return res.status(200).json(response);
      } else {
        return res.status(400).json(errorParamsMessage);
      }
    } catch (error) {
      console.log("Se produjo una excepcion al procesar la peticion:", error);
      response.message = "Ocurrió un error al procesar la petición";
      res.status(400).json(response);
    }
  };

  export const VerCotizacionesId = async (req, res, next) => {

    let response = {};
    try {
      const orderby = req.body.orderby || "asc";
      const ordenar = req.body.ordenar || "IdRelacion";
      
      const body = req.body;

      const pool = await getConnection();
      if (!pool) return res.status(500).json(errorConnectionMessage);
  
      const generateSQL = queriesReparaciones(orderby, ordenar);
  
      const ressDataToFetch = await pool.request()
      .input("reparacion", sql.Int, body.reparacion)
      .query(generateSQL.verPorReparacionCotizacion);
  
      if (ressDataToFetch.recordset) {
        const response = {
          codigo: "00",
          registros: ressDataToFetch.recordset,
        };
        return res.status(200).json(response);
      } else {
        return res.status(400).json(errorParamsMessage);
      }
    } catch (error) {
      console.log("Se produjo una excepcion al procesar la peticion:", error);
      response.message = "Ocurrió un error al procesar la petición";
      res.status(400).json(response);
    }
  };

export const errorEjecucionInsercion = {
  ok: false,
  data: [],
  status: 400,
  message: "Ocurrio un error al realizar la operacion",
};

export const errorParamsMessage = {
  ok: false,
  data: [],
  status: 400,
  message: "Parámetros ingresados no válidos",
};

