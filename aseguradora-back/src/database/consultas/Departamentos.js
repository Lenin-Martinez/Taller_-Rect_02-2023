export const queriesDepartamentos = () => {

    return {
        //select para obtener la informacion de las piezas
        getAll: `SELECT idDepartamento, Departamento FROM DEPARTAMENTOS`,
    };
};
