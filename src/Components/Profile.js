import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Nav from "./Nav";
import "./Profile.css";
import PlansScreen from "./Screens/PlansScreen";

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <div className="profile">
      <Nav />
      <div className="profile_content">
        {/* profile info */}
        <div className="profile_header">
          <img
            className="profile_avatar"
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
          <div className="profile_info">
            <p className="profile_email">{user.email}</p>
            <p className="profileCurrent_plan">Plans(Current Plan: premium)</p>
            <p className="profilePlan_renewal">Renewal date: 09/03/2021</p>
          </div>
        </div>
        {/* plans to choose from */}
        <PlansScreen />
      </div>
    </div>
  );
};

export default Profile;
