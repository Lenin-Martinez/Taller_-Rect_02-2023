export const queriesClientes = (orderBy, ordenar) => {

    const tablename = "Clientes";
    const primarykey = "idCliente";

    const pagination = `ORDER BY ${ordenar} ${orderBy} OFFSET(@offset) ROWS FETCH NEXT (@limit) ROWS ONLY`;

    return {
        getAll: `SELECT * FROM ${tablename}`,
    };
};