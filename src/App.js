import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Screen/Home";
import Login from "./Screen/Login";
import Register from "./Screen/Register";
import Main from "./Layout/Main";
import Profile from "./Screen/Profile";
import ForgetPass from "./Screen/ForgetPass";
import Admin from "./Admin/Admin";
import Seller from "./User/Seller";
import Buyer from "./User/Buyer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",

          element: <Home />,
        },
      ],
    },
    { path: "*", element: <h1 className="text-center mt-5">Not Found!</h1> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;