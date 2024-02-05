import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer>
      <p>
       {new Date().getFullYear()}{" Szkielety programistyczne w aplikacjach internetowych"}
      </p>
    </footer>
  );
};

export default Footer;