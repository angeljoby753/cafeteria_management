import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li><NavLink to="/home" className="nav-link">HOME</NavLink></li>
        <li><NavLink to="/about" className="nav-link">ABOUT US</NavLink></li>
        <li><NavLink to="/pages" className="nav-link">SPECIALITIES</NavLink></li>
        <li><NavLink to="/gallery" className="nav-link">GALLERY</NavLink></li>
       
        <li>
  <NavLink to="/contacts" className="nav-link">
    CONTACTS
  </NavLink>
</li>

      </ul>
    </nav>
  );
};

export default Navbar;
