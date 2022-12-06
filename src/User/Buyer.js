import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Buyer = () => {
  const rol = JSON.parse(localStorage.getItem("User"));
  const [order, setOrder] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");

  const deleteOrder = async () => {
    const { data } = await axios.delete(
      `https://laptop-bazar.vercel.app/api/self-order/${rol?.user._id}`
    );
    toast.success(data.msg);
    setRefresh(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      fetch(`https://laptop-bazar.vercel.app/api/self-order/${rol?.user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${rol?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            setError(data.error);
            setLoader(false);
            return;
          } else {
            setOrder(data.myOrder);
            setLoader(false);
          }
        });
    };
    fetchData();
  }, [refresh]);
  return (
    <div className="my-10 mx-5 lg:mx-10">
      <div className="text-2xl font-semibold my-10">
        Welcome, <h1 className="text-primary">{rol?.user.name}</h1>{" "}
      </div>
      <div>
        {loader && (
          <button
            disabled
            type="button"
            class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              role="status"
              class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>
        )}
      </div>
      <div>
        {order.length === 0 && !error && !loader ? (
          <h1 className="card p-3 shadow-lg text-xl font-semibold text-center my-10 mx-3">
            Order Please!
            <Link className="my-5 text-blue-700" to="/">
              Home
            </Link>
          </h1>
        ) : (
          !loader &&
          !error && (
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Pay</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {order.length > 0 &&
                    !loader &&
                    order.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={item.imgUrl}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </td>
                        <td>{item.ProductName}</td>
                        <td>${item.soldPrice}</td>
                        <td>
                          {item.payment ? (
                            <div className="btnbtn-sm">Paid</div>
                          ) : (
                            <Link
                              to={`/user/payment/${item._id}`}
                              className="btn  btn-primary btn-sm"
                            >
                              Pay
                            </Link>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={deleteOrder}
                            className="btn btn-sm btn-error"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Buyer;
