import { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data.message || response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container mt-5">
      <header className="jumbotron p-5 bg-white rounded-4 text-center shadow-lg border-0 mb-5">
        <h1 className="display-4 fw-bold mb-4 text-gradient">¡Bienvenido a Sistema para usuarios!</h1>
        <p className="lead mt-3 text-secondary">
          Estado del servidor: <strong>{content}</strong>
        </p>
        <hr className="my-4" />
        <p className="text-muted">
          Esta es una aplicación de demostración que muestra cómo implementar un sistema completo de autenticación y autorización utilizando React en el Frontend y Node.js con JWT en el Backend.
        </p>

        <div className="row mt-5 text-start">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 bg-light p-3 hover-lift">
              <div className="card-body">
                <div className="display-6 mb-3">🔒</div>
                <h5 className="card-title text-primary fw-bold">Seguridad JWT</h5>
                <p className="card-text text-muted">Autenticación segura basada en tokens para proteger la información del usuario y las sesiones.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 bg-light p-3 hover-lift">
              <div className="card-body">
                <div className="display-6 mb-3">👥</div>
                <h5 className="card-title text-success fw-bold">Roles Dinámicos</h5>
                <p className="card-text text-muted">Control de acceso basado en roles (Usuario, Moderador, Administrador) para diferentes áreas.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 bg-light p-3 hover-lift">
              <div className="card-body">
                <div className="display-6 mb-3">✨</div>
                <h5 className="card-title text-warning fw-bold">Diseño Moderno</h5>
                <p className="card-text text-muted">Interfaz de usuario fluida y reactiva impulsada por React, Vite y Bootstrap.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
