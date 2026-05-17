// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import "./Navbar.css";

export default function Navbar() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            🔐 JWT Auth
          </Link>
          <div className="navbar-links">
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        </div>
      </nav>
    );
  }

  const isAdmin = user.roles?.includes("ROLE_ADMIN");
  const isModerator = user.roles?.includes("ROLE_MODERATOR");
  const isUser = user.roles?.includes("ROLE_USER");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🔐 JWT Auth
        </Link>
        <div className="navbar-links">
          <span className="user-info">👤 {user.username}</span>
          
          {/* Links disponibles para todos los usuarios */}
          <Link to="/public">Público</Link>
          <Link to="/user">Contenido Usuario</Link>

          {/* Links solo para moderadores */}
          {isModerator && <Link to="/moderator">Contenido Moderador</Link>}

          {/* Links solo para administradores */}
          {isAdmin && <Link to="/admin">Contenido Admin</Link>}

          {/* Mostrar roles */}
          <span className="roles-badge">
            {user.roles?.map(role => (
              <span key={role} className="role-tag">
                {role.replace("ROLE_", "")}
              </span>
            ))}
          </span>

          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
