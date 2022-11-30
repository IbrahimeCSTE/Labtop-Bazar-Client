import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import axios from "axios";
const Payment = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://server-i8icgxkha-ibrahimecste.vercel.app/api/single/order/${id}`
      );
      setOrder(data.order);
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto p-3 my-10">
      <h1 className="text-xl font-bold my-2">Payment</h1>
      <hr />
      <div className="lg:w-96 w-full max-w-screen-xl mx-auto card shadow-lg p-2 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
