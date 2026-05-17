// app/routes/auth.routes.js
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignUp.js";
import * as controller from "../controllers/auth.controller.js";

export default function (app) {
  // Configuración de encabezados para CORS
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Ruta para el registro de nuevos usuarios (Signup)
  // Aplica middlewares para validar duplicados y existencia de roles
  app.post(
    "/api/auth/signup",
    [
      checkDuplicateUsernameOrEmail,
      checkRolesExisted
    ],
    controller.signup
  );

  // Ruta para el inicio de sesión (Signin)
  app.post("/api/auth/signin", controller.signin);
};