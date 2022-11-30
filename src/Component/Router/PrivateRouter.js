import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const rol = JSON.parse(localStorage.getItem("User"));

  let location = useLocation();

  //   if (!rol) {
  //     return (
  //       <div className="spinner-border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     );
  //   }
  if (!rol?.user) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouter;
