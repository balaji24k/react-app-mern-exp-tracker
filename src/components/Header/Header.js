import React, { useContext } from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const Header = () => {
  const { logout, userName, isLoggedIn } = useContext(AuthContext);

  return (
    <div className={isLoggedIn ? classes.afterLogin : classes.beforeLogin}>
      {!isLoggedIn && (
        <>
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.navlink}
            to="/login"
          >
            Login
          </NavLink>{" "}
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.navlink}
            to="/signup"
          >
            Signup
          </NavLink>
        </>
      )}
      {isLoggedIn &&
        <h5 style={{color:"white"}} >User: {userName}</h5>
      }
      {isLoggedIn &&
        <button onClick={logout} >Logout</button>
      }
    </div>
  );
};

export default Header;
