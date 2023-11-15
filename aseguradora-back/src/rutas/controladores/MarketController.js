import { getConnection, sql } from "../../database/conexion.js";
import { queriesCompras } from "../../database/consultas/Compra.js";

export const GetAll = async (req, res, next) => {

  let response = {};
  try {
    // const orderby = req.body.orderby || "asc";
    // const ordenar = req.body.ordenar || "idPieza";
    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesCompras();

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
export const GetPiezasByDepartament = async (req, res, next) => {

  let response = {};
  try {
    let idDepartamento = req.query.idDepartamento;
    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesCompras();

    const ressDataToFetch = await pool
      .request()
      .input('idDepartamento', sql.Int, idDepartamento)
      .query(generateSQL.getPiezaByDepartament);

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
export const GetPiezasByCategory = async (req, res, next) => {

  let response = {};
  try {
    let idCategoria = req.query.idCategoria;
    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesCompras();

    const ressDataToFetch = await pool
      .request()
      .input('idCategoria', sql.Int, idCategoria)
      .query(generateSQL.getPiezaByCategory);

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
export const GetPiezasByCategoryDepartament = async (req, res, next) => {

  let response = {};
  try {
    let idCategoria = req.query.idCategoria;
    let idDepartamento = req.query.idDepartamento;
    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesCompras();

    const ressDataToFetch = await pool
      .request()
      .input('idCategoria', sql.Int, idCategoria)
      .input('idDepartamento', sql.Int, idDepartamento)
      .query(generateSQL.getPiezaByCategory);

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
export const GetPiezaById = async (req, res, next) => {

  let response = {};
  try {
    let idPieza = req.query.idPieza;
    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesCompras();

    const ressDataToFetch = await pool
      .request()
      .input('idPieza', sql.Int, idPieza)
      .query(generateSQL.getPiezaById);

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
export const PostCotizacion = async (req, res, next) => {

  let response = {};
  try {
    //recibo costototal, y un array con id de cada pieza y la cantidad de piezas
    let costo = req.body.costo;
    let arrayPiezas = req.body.piezas;
    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);

    const generateSQL = queriesCompras();

    const ressDataToFetch = await pool
      .request()
      .input('costo', sql.Decimal, costo)
      .query(generateSQL.insertCotizaciones);
    const cotizacionID = ressDataToFetch.recordset[0].CotizacionID;
    for (let pieza of arrayPiezas) {
      await pool.request()
        .input('idCotizacion', sql.Int, cotizacionID)
        .input('idPieza', sql.Int, pieza.piezaID)
        .input('cantidad', sql.Int, pieza.cantidad)
        .query(generateSQL.insertCotizacionesPiezas);
    }
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
export const PutCompra = async (req, res, next) => {
  let response = {};
  try {
    const idCotizacion = req.body.idCotizacion;
    const pool = await getConnection();
    if (!pool) return res.status(500).json(errorConnectionMessage);
    const generateSQL = queriesCompras();

    const ressDataToFetch = await pool
      .request()
      .input('CotizacionID', sql.Int, idCotizacion)
      .execute('RealizarCompra');

    if (ressDataToFetch.rowsAffected[0] > 0) {
      // La inserción fue exitosa si rowsAffected es mayor que 0
      const response = {
        codigo: "00",
        message: "Compra exitosa",
      };
      return res.status(200).json(response);
    } else {
      // Si no se afectó ninguna fila, es posible que haya habido un problema en la inserción
      return res.status(500).json({ message: "No se pudo insertar la pieza." });
    }
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};
export const errorParamsMessage = {
  ok: false,
  data: [],
  status: 400,
  message: "Parámetros ingresados no válidos",
};


