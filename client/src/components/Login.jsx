import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!username || !password) {
      setMessage("Usuario y contraseña son requeridos.");
      setLoading(false);
      return;
    }

    AuthService.login(username, password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="col-md-12 mt-5">
      <div className="card card-container p-4 shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="fw-semibold">Usuario</label>
            <input
              type="text"
              className="form-control form-control-lg bg-light"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
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
                placeholder="Ingresa tu contraseña"
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

          <div className="form-group mb-3 text-center">
            <button className="btn btn-primary btn-lg w-100 fw-bold" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              <span>Entrar</span>
            </button>
          </div>

          {message && (
            <div className="form-group mt-3">
              <div className="alert alert-danger py-2" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
