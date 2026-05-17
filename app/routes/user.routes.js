// app/routes/user.routes.js
import { authJwt } from "../middlewares/index.js";
import * as controller from "../controllers/user.controller.js";

export default function(app) {
  // Configuración de encabezados para CORS
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Ruta de acceso público
  app.get("/api/test/all", controller.allAccess);

  // Ruta para cualquier usuario autenticado (requiere Token válido)
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  // Ruta para Moderadores (requiere Token y rol de moderador)
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  // Ruta para Administradores (requiere Token y rol de administrador)
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};