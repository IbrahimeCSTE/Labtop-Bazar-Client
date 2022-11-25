import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Header/Navbar";
const Main = () => {
  return (
    <div>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
