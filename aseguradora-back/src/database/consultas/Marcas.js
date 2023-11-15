export const queriesMarcas = (orderBy, ordenar) => {

    const tablename = "Marcas";
    const primarykey = "idMarca";

    const pagination = `ORDER BY ${ordenar} ${orderBy} OFFSET(@offset) ROWS FETCH NEXT (@limit) ROWS ONLY`;

    return {
        getAll: `SELECT * FROM ${tablename}`,
    };
};