import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            {/* <img src="/logo.png" alt="logo" className="logo-img" /> */}
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/birth-register"}>Birth Registration</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>+234-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>birthRegistration@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>NIgeria</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
