export const queriesCompras = () => {

    return {
        //select para obtener la informacion de las piezas
        getAll: `SELECT
        P.idPieza,
        M.NombreMarca AS Marca,
        Pr.NombreProveedor AS Proveedor,
        C.NombreCategoria AS Categoria,
        T.NombreTienda AS Tienda,
        D.Departamento AS Departamento,
        P.cantidad,
        P.precioCosto,
        P.precioVenta,
        P.urlImagen
        FROM piezas AS P
        INNER JOIN Marcas AS M ON P.idMarca = M.idMarca
        INNER JOIN Proveedores AS Pr ON P.idProveedor = Pr.idProveedor
        INNER JOIN Categorias AS C ON P.idCategoria = C.idCategoria
        INNER JOIN Tiendas AS T ON P.idTienda = T.idTienda
        INNER JOIN Departamentos AS D ON T.idDepartamento=D.idDepartamento
        WHERE P.estadoActivo=1;`,
        getPiezaByDepartament: `
        SELECT
        P.idPieza,
        M.NombreMarca AS Marca,
        Pr.NombreProveedor AS Proveedor,
        C.NombreCategoria AS Categoria,
        T.NombreTienda AS Tienda,
        D.Departamento AS Departamento,
        P.cantidad,
        P.precioCosto,
        P.precioVenta,
        P.urlImagen
        FROM piezas AS P
        INNER JOIN marcas AS M ON P.idMarca = M.idMarca
        INNER JOIN proveedores AS Pr ON P.idProveedor = Pr.idProveedor
        INNER JOIN categorias AS C ON P.idCategoria = C.idCategoria
        INNER JOIN tiendas AS T ON P.idTienda = T.idTienda
        INNER JOIN Departamentos AS D ON T.idDepartamento=D.idDepartamento
        WHERE D.idDepartamento = @idDepartamento and P.estadoActivo=1; `,
        getPiezaByCategory: `
        SELECT
        P.idPieza,
        M.NombreMarca AS Marca,
        Pr.NombreProveedor AS Proveedor,
        C.NombreCategoria AS Categoria,
        T.NombreTienda AS Tienda,
        D.Departamento AS Departamento,
        P.cantidad,
        P.precioCosto,
        P.precioVenta,
        P.urlImagen
        FROM piezas AS P
        INNER JOIN marcas AS M ON P.idMarca = M.idMarca
        INNER JOIN proveedores AS Pr ON P.idProveedor = Pr.idProveedor
        INNER JOIN categorias AS C ON P.idCategoria = C.idCategoria
        INNER JOIN tiendas AS T ON P.idTienda = T.idTienda
        INNER JOIN Departamentos AS D ON T.idDepartamento=D.idDepartamento
        WHERE C.idCategoria = @idCategoria AND P.estadoActivo=1;
        `,
        getPiezaByCategoryDepartament:`
        SELECT
        P.idPieza,
        M.NombreMarca AS Marca,
        Pr.NombreProveedor AS Proveedor,
        C.NombreCategoria AS Categoria,
        T.NombreTienda AS Tienda,
        D.Departamento AS Departamento,
        P.cantidad,
        P.precioCosto,
        P.precioVenta,
        P.urlImagen
        FROM piezas AS P
        INNER JOIN marcas AS M ON P.idMarca = M.idMarca
        INNER JOIN proveedores AS Pr ON P.idProveedor = Pr.idProveedor
        INNER JOIN categorias AS C ON P.idCategoria = C.idCategoria
        INNER JOIN tiendas AS T ON P.idTienda = T.idTienda
        INNER JOIN Departamentos AS D ON T.idDepartamento=D.idDepartamento
        WHERE C.idCategoria = @idCategoria AND D.idDepartamento=@idDepartamento AND P.estadoActivo=1;
        `,
        getPiezaById:`
        SELECT
        P.idPieza,
        M.NombreMarca AS Marca,
        Pr.NombreProveedor AS Proveedor,
        C.NombreCategoria AS Categoria,
        T.NombreTienda AS Tienda,
        D.Departamento AS Departamento,
        P.cantidad,
        P.precioCosto,
        P.precioVenta,
        P.urlImagen
        FROM piezas AS P
        INNER JOIN marcas AS M ON P.idMarca = M.idMarca
        INNER JOIN proveedores AS Pr ON P.idProveedor = Pr.idProveedor
        INNER JOIN categorias AS C ON P.idCategoria = C.idCategoria
        INNER JOIN tiendas AS T ON P.idTienda = T.idTienda
        INNER JOIN Departamentos AS D ON T.idDepartamento=D.idDepartamento
        WHERE P.idPieza=@idPieza AND P.estadoActivo=1
        `,
        insertCotizaciones:`insert into Cotizaciones(Costo) OUTPUT INSERTED.CotizacionID values(@costo)`,
        insertCotizacionesPiezas:` insert into CotizacionPiezas(idCotizacion,idPieza,Cantidad) values(@idCotizacion,@idPieza,@cantidad)
        `,
        realizarCompra:`RealizarCompra`
    };
};
