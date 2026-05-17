// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, testService } from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const [content, setContent] = useState({
    public: "",
    user: "",
    moderator: "",
    admin: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchContent();
  }, [user, navigate]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const publicContent = await testService.getPublic();
      setContent(prev => ({ ...prev, public: publicContent }));

      if (user.accessToken) {
        const userContent = await testService.getUserContent(user.accessToken);
        setContent(prev => ({ ...prev, user: userContent }));

        if (user.roles?.includes("ROLE_MODERATOR")) {
          const modContent = await testService.getModContent(user.accessToken);
          setContent(prev => ({ ...prev, moderator: modContent }));
        }

        if (user.roles?.includes("ROLE_ADMIN")) {
          const adminContent = await testService.getAdminContent(user.accessToken);
          setContent(prev => ({ ...prev, admin: adminContent }));
        }
      }
    } catch (err) {
      setError("Error al cargar el contenido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard - Bienvenido, {user?.username}!</h1>
      
      <div className="user-info">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Roles:</strong> {user?.roles?.join(", ") || "usuario"}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="content-sections">
        <div className="section">
          <h3>📖 Contenido Público</h3>
          <p>{content.public || "Cargando..."}</p>
        </div>

        <div className="section">
          <h3>👤 Contenido de Usuario</h3>
          <p>{content.user || (loading ? "Cargando..." : "No accesible")}</p>
        </div>

        {user?.roles?.includes("ROLE_MODERATOR") && (
          <div className="section">
            <h3>🛡️ Contenido de Moderador</h3>
            <p>{content.moderator || (loading ? "Cargando..." : "No accesible")}</p>
          </div>
        )}

        {user?.roles?.includes("ROLE_ADMIN") && (
          <div className="section">
            <h3>👑 Contenido de Administrador</h3>
            <p>{content.admin || (loading ? "Cargando..." : "No accesible")}</p>
          </div>
        )}
      </div>

      <button onClick={fetchContent} className="refresh-btn">
        🔄 Actualizar Contenido
      </button>
    </div>
  );
}
