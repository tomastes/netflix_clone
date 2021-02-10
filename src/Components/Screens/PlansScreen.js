import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase";
import "./PlansScreen.css";
import { selectUser, subscribed } from "../../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlansScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  //! pull user subscription from firebase
  useState(() => {
    const unsubscribe = db
      .collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
          // dispatch(subscribed({}))
        });
      });

    return unsubscribe;
  }, []);
  //  console.log(subscription);
  //! pull products from firebase
  useEffect(() => {
    const unsubscribe = db
      .collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapShot) => {
        const products = {};
        querySnapShot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });

        setProducts(products);
      })
      .catch((e) => {
        alert(e);
      });

    return unsubscribe;
  }, []);

  const loadCheckout = async (priceId) => {
    console.log(priceId);
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(error);
      }
      if (sessionId) {
        // "pk_test_51HQxhfBBaXrOCD0N7cGXJxg0J8iPh4CjAH3yQpZLqUWwBXCq99WVOzXpFJdQHmIqeS0M1g8Z419nJ5agjFPAZDZR00LPw72dD3"
        const stripe = await loadStripe(process.env.REACT_APP_FIREBASE_API_KEY);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans_container">
      {Object.entries(products).map(([productId, productData]) => {
        //?ONE APPROACH
        // const currentPlan =
        //   productData.role == subscription.role ? "current plan" : "subscribe";
        //!2SECOND APPROACH
        const isCurrentPackage = productData?.name
          .toLowerCase()
          .includes(subscription?.role);
        //   console.log(productData);
        return (
          // TODO: add logic to check if user's subscription is active
          <div key={Math.random()} className="plan">
            <div className="plan_desc">
              <h5>{productData.name}</h5>
              <p>{productData.description}</p>
            </div>
            <button
              onClick={() => loadCheckout(productData.prices.priceId)}
              className={`${
                isCurrentPackage && "btn--subscribed"
              } btn_subscribe`}
            >
              {isCurrentPackage ? "current plan" : "subscribe"}
            </button>
          </div>
        );
      })}

      {/* <div className="plan">
        <div className="plan_desc">
          <h5>Netflix basic</h5>
          <p>480p</p>
        </div>
        <button className="btn_subscribe">Subscribe</button>
      </div>
      <div className="plan">
        <div className="plan_desc">
          <h5>Netflix premium</h5>
          <p>4K+HDR</p>
        </div>
        <button className="current_plan btn_subscribe">Current pakkage</button>
      </div> */}
    </div>
  );
};

export default PlansScreen;
