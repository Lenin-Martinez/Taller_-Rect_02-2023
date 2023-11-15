import { getConnection, sql } from "../../database/conexion.js";
import { queriesPieza } from "../../database/consultas/Pieza.js";
import { UploadFileToBucket } from "../../utils/CloudStorage.js";

export const GetAll = async (req, res, next) => {

    let response = {};
    try {
      const pool = await getConnection();
      if (!pool) return res.status(500).json(errorConnectionMessage);
  
      const generateSQL = queriesPieza();
      const ressDataToFetch = await pool.request().query(generateSQL.selectAll);
  
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

  export const GetPiezaInfo = async (req, res, next) => {

    let response = {};
    try {
      const pool = await getConnection();
      if (!pool) return res.status(500).json(errorConnectionMessage);
      console.log(req.body);
      const generateSQL = queriesUsuarios();
      const ressDataToFetch = await pool.request()
      .input("Departamento", sql.VarChar, req.body.departamento)
      .input("Categoria", sql.VarChar, req.body.Categoria)
      .input("idPieza", sql.VarChar, req.body.idPieza)
      .query(generateSQL.filtoPiezas);

      console.log('Consulta:',ressDataToFetch);
      console.log('Data:',ressDataToFetch);
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
    }
  




  
export const PostPieza = async (req, res, next) => {
    let response = {};
    try {
        /*
        const file = req.body.file;
        const buffer = Buffer.from(file, 'base64');
        const nombre = req.body.filename;
        const url = await UploadFileToBucket(buffer, nombre);*/
        const body = req.body;
        const imagenBase64 = body.imagen; 
        const imagenTitulo = body.imagenTitulo;
    
        const imagenUrl = await UploadFileToBucket(imagenBase64,imagenTitulo);
    
        let idProveedor = req.body.idProveedor;
        let idCategoria = req.body.idCategoria;
        let idMarca = req.body.idMarca;
        let modelo = req.body.modelo;
        let idTienda = req.body.idTienda;
        let cantidad = req.body.cantidad;
        let precioCosto = req.body.precioCosto; 
        let precioVenta = req.body.precioVenta;
 
        const pool = await getConnection();
        if (!pool) return res.status(500).json(errorConnectionMessage);
        const generateSQL = queriesPieza();

        const ressDataToFetch = await pool
            .request()
            .input('idProveedor', sql.Int, idProveedor)
            .input('idCategoria', sql.Int, idCategoria)
            .input('idMarca', sql.Int, idMarca)
            .input('modelo', sql.VarChar, modelo)
            .input('idTienda', sql.Int, idTienda)
            .input('cantidad', sql.Int, cantidad)
            .input('precioCosto', sql.Decimal, precioCosto)
            .input('precioVenta', sql.Decimal, precioVenta)
            .input('urlImagen', sql.VarChar, imagenUrl)
            .query(generateSQL.insertPieza);

        if (ressDataToFetch.rowsAffected[0] > 0) {
            // La inserción fue exitosa si rowsAffected es mayor que 0
            const response = {
                codigo: "00",
                message: "La inserción fue exitosa.",
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
export const GetProveedores = async (req, res, next) => {

    let response = {};
    try {
        const pool = await getConnection();
        if (!pool) return res.status(500).json(errorConnectionMessage);

        const generateSQL = queriesPieza();

        const ressDataToFetch = await pool.request().query(generateSQL.selectProveedor);

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
export const GetCategorias = async (req, res, next) => {

    let response = {};
    try {
        const pool = await getConnection();
        if (!pool) return res.status(500).json(errorConnectionMessage);

        const generateSQL = queriesPieza();

        const ressDataToFetch = await pool.request().query(generateSQL.selectCategorias);

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
        const pool = await getConnection();
        if (!pool) return res.status(500).json(errorConnectionMessage);

        const generateSQL = queriesPieza();

        const ressDataToFetch = await pool.request().query(generateSQL.selectMarcas);

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
export const GetTiendas = async (req, res, next) => {

    let response = {};
    try {
        const pool = await getConnection();
        if (!pool) return res.status(500).json(errorConnectionMessage);

        const generateSQL = queriesPieza();

        const ressDataToFetch = await pool.request().query(generateSQL.selectTiendas);

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
export const PutPieza = async (req, res, next) => {
    let response = {};
    try {
        let idPieza = req.body.idPieza;
        let idProveedor = req.body.idProveedor;
        let idCategoria = req.body.idCategoria;
        let idMarca = req.body.idMarca;
        let modelo = req.body.modelo;
        let idTienda = req.body.idTienda;
        let cantidad = req.body.cantidad;
        let precioCosto = req.body.precioCosto;
        let precioVenta = req.body.precioVenta;
        const pool = await getConnection();
        if (!pool) return res.status(500).json(errorConnectionMessage);
        const generateSQL = queriesPieza();

        const ressDataToFetch = await pool
            .request()
            .input('idProveedor', sql.Int, idProveedor)
            .input('idCategoria', sql.Int, idCategoria)
            .input('idMarca', sql.Int, idMarca)
            .input('modelo', sql.VarChar, modelo)
            .input('idTienda', sql.Int, idTienda)
            .input('cantidad', sql.Int, cantidad)
            .input('precioCosto', sql.Decimal, precioCosto)
            .input('precioVenta', sql.Decimal, precioVenta)
            .input('idPieza',sql.Int,idPieza)
            .query(generateSQL.updatePieza);

        if (ressDataToFetch.rowsAffected[0] > 0) {
            // La inserción fue exitosa si rowsAffected es mayor que 0
            const response = {
                codigo: "00",
                message: "La actualizacion fue exitosa.",
            };
            return res.status(200).json(response);
        } else {
            // Si no se afectó ninguna fila, es posible que haya habido un problema en la inserción
            return res.status(500).json({ message: "No se pudo actualizar la pieza." });
        }
    } catch (error) {
        console.log("Se produjo una excepcion al procesar la peticion:", error);
        response.message = "Ocurrió un error al procesar la petición";
        res.status(400).json(response);
    }
};
export const PutInactivarPieza = async (req, res, next) => {
    let response = {};
    try {
        let idPieza = req.body.idPieza;
        const pool = await getConnection();
        if (!pool) return res.status(500).json(errorConnectionMessage);
        const generateSQL = queriesPieza();

        const ressDataToFetch = await pool
            .request()
            .input('idPieza',sql.Int,idPieza)
            .query(generateSQL.inactivarPieza);

        if (ressDataToFetch.rowsAffected[0] > 0) {
            // La inserción fue exitosa si rowsAffected es mayor que 0
            const response = {
                codigo: "00",
                message: "La eliminacion fue exitosa.",
            };
            return res.status(200).json(response);
        } else {
            // Si no se afectó ninguna fila, es posible que haya habido un problema en la inserción
            return res.status(500).json({ message: "No se pudo eliminar la pieza." });
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
