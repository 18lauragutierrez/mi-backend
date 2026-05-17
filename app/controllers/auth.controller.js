import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

/**
 * Controlador para el registro de nuevos usuarios.
 */
export const signup = async (req, res) => {
  try {
    // Guardamos el usuario en la base de datos con la contraseña encriptada
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      // Si se proporcionan roles, los buscamos en la BD
      const roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles },
        },
      });
      // Asociamos los roles al usuario
      await user.setRoles(roles);
      res.send({ message: "¡Usuario registrado exitosamente!" });
    } else {
      // Si no se proporcionan roles, asignamos el rol de usuario (id: 1) por defecto
      await user.setRoles([1]);
      res.send({ message: "¡Usuario registrado exitosamente!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/**
 * Controlador para el inicio de sesión (Login).
 */
export const signin = async (req, res) => {
  try {
    // Buscamos al usuario por su nombre de usuario
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    // Si el usuario no existe
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    // Comparamos la contraseña ingresada con la almacenada en la BD
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "¡Contraseña incorrecta!",
      });
    }

    // Si la contraseña es correcta, generamos el Token JWT
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // Expira en 24 horas
    });

    // Obtenemos los roles del usuario para enviarlos en la respuesta
    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    // Respondemos con los datos del usuario y el token
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};