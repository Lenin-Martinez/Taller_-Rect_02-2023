export const queriesReparaciones = (orderBy, ordenar) => {

    const tablename = "Reparaciones";
    const cotizacionesTable = "PiezasReparacion";
    const primarykey = "idReparacion";

    const pagination = `ORDER BY ${ordenar} ${orderBy} OFFSET(@offset) ROWS FETCH NEXT (@limit) ROWS ONLY`;

    return {
        getAll: `SELECT * FROM ${tablename}`,
        createReparacion: `INSERT INTO ${tablename} ([modelo],[placa],[fechaIngreso],[detalles],[imagen],[idCliente],[idMarca],[idTaller],[color],[estado]) VALUES
            (@modelo,@placa,@fechaIngreso,@detalles,@imagen,@idCliente,@idMarca,@idTaller,@color,'activo')`,
        getActivos: `SELECT ${tablename}.*, (SELECT NombreCliente FROM Clientes where idCliente = ${tablename}.idCliente) as cliente FROM ${tablename} where estado = 'activo'`,
        getEnProceso: `SELECT ${tablename}.*, (SELECT NombreCliente FROM Clientes where idCliente = ${tablename}.idCliente) as cliente FROM ${tablename} where estado = 'proceso'`,
        getFinalizados: `SELECT ${tablename}.*, (SELECT NombreCliente FROM Clientes where idCliente = ${tablename}.idCliente) as cliente FROM  ${tablename} where estado = 'finalizado'`,
        getRechazado: `SELECT ${tablename}.*, (SELECT NombreCliente FROM Clientes where idCliente = ${tablename}.idCliente) as cliente FROM  ${tablename} where estado = 'rechazado'`,
        cambioEstado: `UPDATE ${tablename} SET estado = @estado where idReparacion = @id`,
        agregarCotizacion: `INSERT INTO ${cotizacionesTable} ([IdReparacion],[CotizacionID]) VALUES (@reparacion,@cotizacion)`,
        verCotizaciones: `SELECT * FROM ${cotizacionesTable}`,
        verPorReparacionCotizacion: `SELECT * FROM ${cotizacionesTable} where IdReparacion = @reparacion`,
    };
};