import React, { useEffect, useState } from "react";
import "./App.css";
import Homescreen from "./Components/Screens/Homescreen";
import PlansScreen from "./Components/Screens/PlansScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import db, { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  login,
  selectUser,
  selectPlan,
  currentPlan,
} from "./features/userSlice";
import Profile from "./Components/Profile";
import SubscribeScreen from "./Components/Screens/SubscribeScreen";
function App() {
  console.log(process.env);
  const user = useSelector(selectUser);
  const currentSubscription = useSelector(selectPlan);
  // console.log(plan);
  // console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser?.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (user) {
      db.collection("customers")
        .doc(user?.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach(async (subscription) => {
            dispatch(currentPlan(subscription.data().role));
          });
        });
    }
  }, [user]);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            {!currentSubscription ? (
              <SubscribeScreen />
            ) : (
              <>
                <Route path="/yourAccount">
                  <Profile />
                </Route>

                <Route exact path="/">
                  <Homescreen />
                </Route>
              </>
            )}
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
