import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MiniNav from "./MiniNav";
import "./Nav.css";
const Nav = ({ OnSubscribePage }) => {
  const history = useHistory();
  const [show, handleShow] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => {
      window.removeEventListener("scroll", transitionNavbar);
    };
  }, []);
  return (
    <div className={`nav ${show && `nav_black`}`}>
      <div className="nav_content">
        <img
          onClick={(e) => history.push("/")}
          className="nav_logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        {!OnSubscribePage && (
          <div className="nav_dropdown" onMouseOver={() => setIsShown(true)}>
            <img
              className="nav_avatar"
              src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
              alt=""
            />
            <div onMouseLeave={() => setIsShown(false)}>
              {isShown && <MiniNav />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
