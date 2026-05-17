import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto border-0 rounded-3" style={{ maxWidth: '600px' }}>
        <div className="card-header bg-primary text-white text-center py-3">
          <h3 className="mb-0">
            Perfil de <strong>{currentUser.username}</strong>
          </h3>
        </div>
        <div className="card-body p-4">
          <p>
            <strong>Token JWT:</strong>{" "}
            <span className="text-muted text-break">
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </span>
          </p>
          <hr />
          <p>
            <strong>ID de Usuario:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Correo Electrónico:</strong> {currentUser.email}
          </p>
          <hr />
          <p className="mb-2"><strong>Roles Asignados:</strong></p>
          <ul className="list-group mt-2">
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index} className="list-group-item d-flex align-items-center">
                  <span className="badge bg-secondary me-2">Rol</span> {role}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
