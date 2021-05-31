import React from "react";
import "./Navbar.css";
import { NavLink, withRouter} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header">
      <ul className="nav">
        <li className="home">
          <NavLink
            className={"navbar-head"}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            gap covid analytics
          </NavLink>
        </li>
        <li className="global">
          <NavLink
            className={"navbar-item"}
            to={"/global"}
            style={{ textDecoration: "none" }}
          >
            global
          </NavLink>
        </li>
        <li className="us">
          <NavLink
            className={"navbar-item"}
            to={"/unitedstates"}
            style={{ textDecoration: "none" }}
          >
            united states
          </NavLink>
        </li>
        <li className="about">
          <NavLink
            className={"navbar-item"}
            to={"/about"}
            style={{ textDecoration: "none" }}
          >
            about
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
