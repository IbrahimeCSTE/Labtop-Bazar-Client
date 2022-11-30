import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../Firebase/FirebaseAuth";
const ForgetPass = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState(false);
  const handlePass = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        setEmail("");
        setEmailMsg(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };
  return (
    <div className="text-center mt-10">
      {emailMsg ? (
        <div className="card p-5 text-white max-w-screen-2xl m-5 max-auto shadow-md bg-purple-700">
          <div>
            <h1>
              Go to your email. <br />
              Change your Passeord.
            </h1>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePass}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          <br />
          <button className="btn btn-sm my-4">submit</button>
          <Toaster />
        </form>
      )}
    </div>
  );
};

export default ForgetPass;
