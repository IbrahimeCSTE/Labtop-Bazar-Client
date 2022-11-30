import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
const Navbar = () => {
  const [load, setLoad] = useState(false);
  const logOut = () => {
    localStorage.removeItem("User");
    setLoad(true);
    redirect("/user/login");
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, [load]);

  return (
    <div>
      <div className="navbar bg-purple-800 lg:text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a>Product</a>
              </li>
              <li>
                <a>Category</a>
              </li>
              <li>
                <Link to="/user/login" className="btn btn-sm text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <i className="fas mx-2 fa-laptop-code"></i>Laptop Bazar
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Product</a>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                <i className="fas mx-2 fa-2x fa-user-circle"></i>
                {user?.user?.name}
              </label>
              <ul
                tabIndex={0}
                className="menu text-dark dropdown-content p-2 shadow bg-base-500 rounded-box w-52 "
              >
                <li className="my-2">
                  <Link
                    to={`/${user?.user?.rol}`}
                    className="btn btn-sm btn-info pb-1"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-2">
                  <button onClick={logOut} className="btn btn-sm pb-1">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link to="/user/login" className="btn btn-sm mx-5">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
