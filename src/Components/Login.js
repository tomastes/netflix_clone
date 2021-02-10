import React, { useState } from "react";
import "./Login.css";
import SignInScreen from "./SignInScreen";
const Login = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="loginscreen">
      <div className="loginscreen__background">
        <img
          className="loginscreen__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button onClick={(e) => setSignIn(true)} className="loginScreen_button">
          Sign In
        </button>
      </div>
      <div className="loginScreen__gradient" />

      <div className="loginScreen__body">
        {signIn ? (
          <SignInScreen />
        ) : (
          <>
            <h1>Onbeperkt series, films en meer kijken.</h1>
            <h2>Kijk waar je wilt. Altijd opzegbaar.</h2>
            <p>
              Klaar om te kijken? Voer je e-mailadres in om je lidmaatschap te
              starten of te hernieuwen.
            </p>
            <div className="loginscreen_input">
              <form action="">
                <input type="email" placeholder="email adress" />
                <button className="loginscreen_btn">GET STARTED</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
