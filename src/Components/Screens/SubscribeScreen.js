import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { auth } from "../../firebase";
import Nav from "../Nav";
import PlansScreen from "./PlansScreen";
import "./SubscribeScreen.css";
const SubscribeScreen = () => {
  const dispatch = useDispatch();
  const signOutHandelar = () => {
    console.log("clicked");
    auth.signOut();
    dispatch(logout());
  };

  return (
    <div className="SubscribeScreen">
      <div className="header_">
        <Nav OnSubscribePage />
        <h4 onClick={signOutHandelar} className="btn_signout">
          sign out{" "}
        </h4>
      </div>
      <div className="description">
        <h5>Choose the plan that’s right for you</h5>
        <p>Downgrade or upgrade at any time.</p>
      </div>
      <div className="plans_screen-container">
        <PlansScreen />
      </div>
    </div>
  );
};

export default SubscribeScreen;
