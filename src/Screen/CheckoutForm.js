import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";

const CheckoutForm = ({ order }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [payBtn, setPayBtn] = useState(false);

  const {
    soldPrice,
    buyerName,
    buyerEmail,
    buyerId,
    payment,
    ProductId,
    buyerNo,
  } = order;
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("[error]", error);
      setCardError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: buyerEmail,
            phone: buyerNo,
            name: buyerName,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // console.log("card info", card);
      // store payment info in the database

      fetch("https://laptop-bazar.vercel.app/api/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          soldPrice,
          transactionId: paymentIntent.id,
          buyerEmail,
          buyerId,
          buyerName,
          ProductId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg) {
            toast.success(data.msg);
            setProcessing(false);
            setPayBtn(true);
          }
          // console.log(data);
          // if (data.insertedId) {
          //   setSuccess("Congrats! your payment completed");
          //   setTransactionId(paymentIntent.id);
          // }
        });
    }
  };
  useEffect(() => {
    // Create PaymentIntent
    if (soldPrice) {
      fetch("https://laptop-bazar.vercel.app/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ soldPrice }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          //console.log(data.clientSecret);
        });
    }
  }, [soldPrice]);
  return (
    <div>
      {payBtn ? (
        <h1 className="text-violet-800 p-4  font-bold text-2xl">
          <i className="fas fa-2x fa-check"></i>
          Payment Successfully
        </h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#000000",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div>
            {processing ? (
              <h1 className="font-bold tex-sm">Process...</h1>
            ) : (
              <button
                className="btn btn-sm my-5"
                type="submit"
                disabled={!stripe}
              >
                Pay
              </button>
            )}
          </div>
        </form>
      )}

      <Toaster />
    </div>
  );
};

export default CheckoutForm;
