import { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data.message || response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container mt-5">
      <header className="jumbotron p-5 bg-white rounded-4 text-center shadow">
        <h3 className="display-4 text-warning fw-bold mb-4">Panel de Moderador</h3>
        <p className="lead mt-3 text-secondary">{content}</p>
      </header>
    </div>
  );
};

export default BoardModerator;
