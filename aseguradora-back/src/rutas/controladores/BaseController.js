export const Bienvenido = async (req, res, next) => {
  let response = {};
  try {
    response.message = "Endpoint funcional";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};
