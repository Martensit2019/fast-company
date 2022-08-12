import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className="nav-link" aria-current="page">
          Главная
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" aria-current="page">
          Вход
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link" aria-current="page">
          Пользователи
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
