import { useState } from "react";
import AuthService from "../services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    if (!username || !email || !password) {
      setMessage("Usuario, correo y contraseña son obligatorios.");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setMessage("El usuario debe tener entre 3 y 20 caracteres.");
      return;
    }

    if (password.length < 6 || password.length > 40) {
      setMessage("La contraseña debe tener entre 6 y 40 caracteres.");
      return;
    }

    AuthService.register(username, email, password, role).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12 mt-5">
      <div className="card card-container p-4 shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4 fw-bold">Registro</h2>
        <form onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="form-group mb-3">
                <label htmlFor="username" className="fw-semibold">Usuario</label>
                <input
                  type="text"
                  className="form-control form-control-lg bg-light"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Elige un usuario"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email" className="fw-semibold">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg bg-light"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="password" className="fw-semibold">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg bg-light"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crea una contraseña"
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="role" className="fw-semibold">Rol (Opcional)</label>
                <select 
                  className="form-control form-control-lg bg-light"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Selecciona un rol (Por defecto: Usuario)</option>
                  <option value="user">Usuario</option>
                  <option value="moderator">Moderador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="form-group mb-3 text-center">
                <button className="btn btn-primary btn-lg w-100 fw-bold">Crear Cuenta</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group mt-3">
              <div
                className={
                  successful ? "alert alert-success py-2" : "alert alert-danger py-2"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
