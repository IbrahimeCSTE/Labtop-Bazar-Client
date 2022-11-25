import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../Firebase/FirebaseAuth";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("buyer");
  const googleProvider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const [loginRol, setLoginRol] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const auth = getAuth(app);
  const handleRegister = () => {
    if (!name && !email && !password) {
      toast.error("Fill up the Form");
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUserProfile();
        fetch("http://localhost:5000/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name,
            rol,
            password,
            payment: false,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.msg) {
              setLoading(false);
              setLoginRol(true);
              toast.success(data.msg);
              localStorage.setItem("User", JSON.stringify(data));
              setName("");
              setEmail("");
              setPassword("");
            }
            if (data.error) {
              toast.error(data.error);
              setLoading(false);
            }
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };
  const handleGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        fetch("http://localhost:5000/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
            payment: false,
            rol: "buyer",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.msg) {
              setLoading(false);
              setLoginRol(true);

              toast.success(data.msg);
              localStorage.setItem("User", JSON.stringify(data));
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
  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        toast(error.massage);
      });
  };
  const userRol = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    if (loginRol && userRol) {
      window.document.location.href = `/${userRol?.user?.rol}`;
    }
  }, [loginRol, userRol]);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {loading ? (
            <h1 className="text-5xl font-bold">Loading..</h1>
          ) : (
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
          )}
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
            <div className="role">
              <select
                onChange={(e) => setRol(e.target.value)}
                className="select select-ghost w-full max-w-xs"
              >
                <option disabled selected>
                  Your Role
                </option>
                <option value="admin">Admin</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button onClick={handleRegister} className="btn btn-primary">
                Sign Up{" "}
              </button>
              <button onClick={handleGoogle} className="btn my-5">
                <i className="fab text-white fa-2x fa-google-plus-g"></i>
              </button>
              <h1 className="font-semibold text-xl  my-5 text-center">
                Already Registed?
                <Link style={{ color: "#1d4ed8" }} to="/user/login">
                  Login
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

export default Register;
