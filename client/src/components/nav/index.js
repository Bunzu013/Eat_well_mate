import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/logo";
import UserAuth from "../user_auth";
import "./index.css";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="left-links">
       
      <Link to="/home" >
          <Logo />
        </Link>
        
        <Link to="/recipes/view" className="button btn-sm">
          {"Szukaj przepisow"}
        </Link>
  
      </div>   
  <UserAuth />
    </nav>
  );
};

export default Nav;