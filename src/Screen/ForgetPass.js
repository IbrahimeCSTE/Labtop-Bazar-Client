import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../Firebase/FirebaseAuth";
const ForgetPass = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const handlePass = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        setEmail("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };
  return (
    <div className="text-center mt-10">
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
    </div>
  );
};

export default ForgetPass;
