
import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user,logout } = useContext(AuthContext);
  // const [showUserDetails, setShowUserDetails] = useState(false);

  // const toggleUserDetails = () => {
  //   setShowUserDetails(!showUserDetails);
  // };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <Link to="/profile" style={{ textDecoration: "none" }}>
            <p style={{ color: "white" }}> Welcome, {user.username}</p>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
            <p style={{ color: "white" }}> Logout </p>
            </Link>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

