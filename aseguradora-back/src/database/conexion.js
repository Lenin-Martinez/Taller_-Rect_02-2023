import sql from "mssql";
import config from "../../config.js";

const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  requestTimeout: 300000,
  dialectOptions: {
    requestTimeout: 300000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    requestTimeout: 600000
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log("getConnection -> error:", error?.message)
    sql.on('error', err => {
      console.log('Error en la conexion a la base de datos');
    })
    return false
  }
}

export { sql }
