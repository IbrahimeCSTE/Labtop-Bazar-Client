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
import Category from "./Screen/Category";
import Payment from "./Screen/Payment";
import PrivateRouter from "./Component/Router/PrivateRouter";
import Blog from "./Screen/Blog";

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
        {
          path: "/user/login",
          element: <Login />,
        },
        {
          path: "/user/register",
          element: <Register />,
        },
        {
          path: "/user/profile",
          element: <Profile />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/user/payment/:id",
          element: (
            <PrivateRouter>
              <Payment />
            </PrivateRouter>
          ),
        },
        {
          path: "/user/password/reset",
          element: (
            <PrivateRouter>
              <ForgetPass />
            </PrivateRouter>
          ),
        },
        {
          path: "/admin",
          element: (
            <PrivateRouter>
              <Admin />,
            </PrivateRouter>
          ),
          // (
          //   <PrivateRouter>

          //   </PrivateRouter>
          // ),
        },
        {
          path: "/seller",
          element: (
            <PrivateRouter>
              <Seller />
            </PrivateRouter>
          ),
        },
        {
          path: "/buyer",
          element: (
            <PrivateRouter>
              <Buyer />
            </PrivateRouter>
          ),
        },
        {
          path: "/category/:id",
          element: (
            <PrivateRouter>
              <Category />
            </PrivateRouter>
          ),
        },
      ],
    },
    { path: "*", element: <h1 className="text-center mt-5">Not Found!</h1> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
