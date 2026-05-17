// server.js (Raíz del proyecto)
import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parsear solicitudes de tipo application/json
app.use(express.json());

// Parsear solicitudes de tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const Role = db.role;

// Sincronización de la base de datos
// alter: true actualizará la estructura sin eliminar datos
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada correctamente...');
  initial();
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

// Ruta simple de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación JWT de Grace." });
});

// Registrar las rutas
authRoutes(app);
userRoutes(app);

// Configuración del puerto y puesta en marcha del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});

/**
 * Función para inicializar los roles por defecto en la base de datos
 */
async function initial() {
  try {
    // Verificar si los roles ya existen antes de crearlos
    const roles = await Role.findAll();
    
    if (roles.length === 0) {
      await Role.create({
        id: 1,
        name: "user"
      });

      await Role.create({
        id: 2,
        name: "moderator"
      });

      await Role.create({
        id: 3,
        name: "admin"
      });
      
      console.log('Roles inicializados correctamente.');
    } else {
      console.log('Los roles ya existen en la base de datos.');
    }
  } catch (error) {
    console.error('Error al inicializar los roles:', error.message);
  }
}