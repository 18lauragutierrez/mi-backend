// app/config/db.config.js
export default {
  HOST: "localhost",
  USER: "root",      // Tu usuario de MySQL (normalmente root)
  PASSWORD: "",      // Tu contraseña de MySQL (déjalo vacío "" si no tienes)
  DB: "lab07",       // El nombre de la base de datos que crearemos en MySQL
  PORT: 3306,        // Puerto por defecto de MySQL
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};