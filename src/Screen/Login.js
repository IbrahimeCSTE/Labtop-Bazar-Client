import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/FirebaseAuth";
const auth = getAuth(app);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const [loginRol, setLoginRol] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.msg) {
              toast.success(data.msg);
              localStorage.setItem("User", JSON.stringify(data));
              setLoginRol(true);
              setEmail("");
              setPassword("");
              window.document.location.href = "/";
            }
            if (data.error) {
              toast.error(data.error);
            }
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  const handleGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.msg) {
              setLoading(false);
              toast.success(data.msg);
              localStorage.setItem("User", JSON.stringify(data));
              setLoginRol(true);
            }
            if (data.error) {
              toast.error(data.error);
              setLoading(false);
            }
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
        // The email of the user's account used.
      });
  };
  const rol = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    if (loginRol && rol) {
      // console.log((window.document.location.href = rol?.user?.rol));
      window.document.location.href = `/${rol?.user?.rol}`;
    }
  }, [loginRol, rol]);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {loading ? (
            <h1 className="text-5xl font-bold">Loading..</h1>
          ) : (
            <h1 className="text-5xl font-bold">Login now!</h1>
          )}
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <Link
                  to="/user/password/reset"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
              <button onClick={handleGoogle} className="btn my-5">
                <i className="fab text-white fa-2x fa-google-plus-g"></i>
              </button>
              <h1 className="font-semibold text-xl  my-5 text-center">
                New User?
                <Link style={{ color: "#1d4ed8" }} to="/user/register">
                  Register
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
