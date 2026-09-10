
import { Link, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaQuestionCircle,
  FaUsers,
  FaBell,
  FaUser,
  FaTrophy,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-custom">

      <div className="container-fluid">

        <Link
          className="navbar-brand"
          to="/home"
        >
          🌐 Community Hub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/home">
                <FaHome /> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/public-feed"
              >
                <FaGlobe /> Feed
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/questions"
              >
                <FaQuestionCircle /> Questions
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/friends"
              >
                <FaUsers /> Friends
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/leaderboard"
              >
                <FaTrophy /> Leaderboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/notifications"
              >
                <FaBell />
              </Link>
            </li>

            <li className="nav-item">
              <span className="user-name">
                <FaUser /> {user?.name}
              </span>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-danger logout-btn"
                onClick={logout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;

