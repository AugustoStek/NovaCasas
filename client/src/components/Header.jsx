import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <h1 className="header-logo">
            <span className="logo-primary">Nova</span>
            <span className="logo-secondary">Casas</span>
          </h1>
        </Link>

        <form className="header-search-form">
          <input
            type="text"
            placeholder="Buscar..."
            className="header-search-input"
          />

          <FaSearch className="header-search-icon" />
        </form>

        <ul className="header-nav">
          <Link to="/">
            <li className="header-nav-item hidden-mobile">Inicio</li>
          </Link>

          <Link to="/about">
            <li className="header-nav-item hidden-mobile">Acerca de</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <Link to="/profile">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="Perfil"
                />
              </Link>
            ) : (
              <Link to="/sign-in">
                <li className="header-nav-item">Iniciar sesión</li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
