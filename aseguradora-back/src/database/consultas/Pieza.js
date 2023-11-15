export const  queriesPieza = () =>{
    return{
        selectAll: `select Proveedores.NombreProveedor,Marcas.NombreMarca, Piezas.Modelo,PrecioCosto,Categorias.NombreCategoria,idPieza 
        from Piezas inner join Proveedores
        on Piezas.idProveedor = Proveedores.idProveedor inner join Marcas
        on Piezas.idMarca = Marcas.idMarca inner join Categorias
        on Piezas.idCategoria = Categorias.idCategoria `,

        filtoPiezas: `select Proveedores.NombreProveedor,Marcas.NombreMarca, Piezas.Modelo,
        PrecioCosto,Categorias.NombreCategoria,idPieza, Departamentos.Departamento from Piezas inner join Proveedores
        on Piezas.idProveedor = Proveedores.idProveedor inner join Marcas
        on Piezas.idMarca = Marcas.idMarca inner join Categorias
        on Piezas.idCategoria = Categorias.idCategoria inner join Tiendas
        on Piezas.idTienda = Tiendas.idTienda  inner join Departamentos
        on Tiendas.idDepartamento = Departamentos.idDepartamento
        where (Departamento = '' or NombreCategoria = @Categoria and idPieza = @idPieza) or 
        (Departamento = @Departamento and NombreCategoria = '' or idPieza = @idPieza) or 
        (Departamento = @Departamento and NombreCategoria = @Categoria or idPieza = '') `,

        insertPieza:`insert into Piezas(idProveedor,idCategoria,idMarca,Modelo,idTienda,Cantidad,
            PrecioCosto,PrecioVenta,urlImagen) VALUES (
            @idProveedor,@idCategoria,@idMarca,@modelo,@idTienda,@cantidad,@precioCosto,
            @precioVenta,@urlImagen
        )`,
        selectProveedor:`select * from proveedores`,
        selectCategorias:`select * from categorias`,
        selectMarcas:`select * from marcas`,
        selectTiendas:`select * from tiendas`,
        updatePieza:`
        update Piezas
        set idProveedor=@idProveedor,
            idCategoria=@idCategoria,
            idMarca=@idMarca, 
            Modelo=@modelo,
            idTienda=@idTienda,
            Cantidad=@cantidad,
            PrecioCosto=@PrecioCosto,
            PrecioVenta=@PrecioVenta
            where idPieza = @idPieza
        `,
        inactivarPieza:`update Piezas set estadoActivo = 2 where idPieza=@idPieza`
    }
}