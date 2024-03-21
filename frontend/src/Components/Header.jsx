import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handelLogOut = () => {
    setAuth({
      user: null,
      token:"",
    });
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <header
        style={{
          border: "1px solid #75787ebe",
          borderRadius: "5px",
          position: "sticky",
          top: "2px",
          zIndex:"2"
        }}
      >
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a style={{ fontSize: "1.5em", fontWeight: "bold" }} href="/" >ATTEND</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              {auth.user ? (
                <>
                  <div className="navbar-nav">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      onClick={()=>handelLogOut()}
                    >
                      LogOut
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <div className="navbar-nav">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
