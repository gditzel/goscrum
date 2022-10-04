import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header>
        <img src="/img/goscrum.png" alt="Logo" />
        <span>
          Estamos en el entorno {process.env.NODE_ENV} corriendo en el puerto{" "}
          {process.env.REACT_APP_PORT}
        </span>
        <div className="wrapper_right_header">
          <div>
            <button onClick={() => navigate("/donate", { replace: true })}>
              Donar
            </button>
          </div>
          <div className="black">Tareas creadas: {tasks?.length}</div>
          <div>{localStorage.getItem("userName")}</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      </header>
    </>
  );
};

export default Header;
