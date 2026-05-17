/**
 * Controlador para acceder a contenido público.
 */
export const allAccess = (req, res) => {
  // Envía una respuesta indicando que el contenido es público
  res.status(200).send("Contenido Público.");
};

/**
 * Controlador para acceder a contenido disponible para cualquier usuario autenticado.
 */
export const userBoard = (req, res) => {
  // Envía una respuesta indicando que el contenido es para usuarios autenticados
  res.status(200).send("Contenido de Usuario.");
};

/**
 * Controlador para acceder a contenido reservado para administradores.
 */
export const adminBoard = (req, res) => {
  // Envía una respuesta indicando que el contenido es para administradores
  res.status(200).send("Contenido de Administrador.");
};

/**
 * Controlador para acceder a contenido reservado para moderadores.
 */
export const moderatorBoard = (req, res) => {
  // Envía una respuesta indicando que el contenido es para moderadores
  res.status(200).send("Contenido de Moderador.");
};