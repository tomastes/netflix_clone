import { ArrowDropDownTwoTone } from "@material-ui/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./MiniNav.css";
import { auth } from "../firebase";
import ArrowDropUpTwoToneIcon from "@material-ui/icons/ArrowDropUpTwoTone";
import { useDispatch } from "react-redux";
import { logout, removePlan } from "../features/userSlice";

const MiniNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    auth.signOut();
    dispatch(logout());
    dispatch(removePlan());
  };
  return (
    <div className="dropdown_nav">
      <ArrowDropUpTwoToneIcon className="arrow_drowUp" />
      <div className="dropdown_links">
        <h6 onClick={(e) => history.push("/yourAccount")}>account</h6>
        <h6>help center</h6>

        <h6 onClick={handleLogout}>log out</h6>
      </div>
    </div>
  );
};

export default MiniNav;
