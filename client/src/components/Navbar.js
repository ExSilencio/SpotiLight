// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import '../App.css';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// We import the logo for the app.
import logo from "../images/logo.png";

// Here, we display our Navbar
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          <img
              className="logo" 
              src={logo}
              alt="logo" 
          />
          Spoti<span style={{color:'#1DB954', fontWeight:600}}>Light</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item justify-content-end">
              <NavLink className="nav-link" to="/app">
                App
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
