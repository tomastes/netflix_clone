import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignInScreen.css";
const SignInScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signInhandelar = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {})
      .catch((e) => alert(e));
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((auth) => {})
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <div className="signupScreen">
      <form action="">
        <h1>sign In</h1>
        <input ref={emailRef} type="email" placeholder="email" />
        <input ref={passwordRef} type="password" placeholder="password" />
        <button onClick={signInhandelar} type="submit">
          Sign In
        </button>
        <h4>
          new to netflix? <span onClick={register}> sign up now.</span>
        </h4>
      </form>
    </div>
  );
};

export default SignInScreen;
