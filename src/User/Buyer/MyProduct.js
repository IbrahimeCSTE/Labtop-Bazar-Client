import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MyProduct = () => {
  const [myProduct, setMyProduct] = useState([]);
  const [loader, setLoder] = useState(false);
  const rol = JSON.parse(localStorage.getItem("User"));
  const [reLoad, setReLoad] = useState(false);

  const deleteProduct = async (id) => {
    const { data } = await axios.delete(
      `https://laptop-bazar.vercel.app/api/product/${id}`
    );
    if (data.msg) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
    setReLoad(!reLoad);
  };
  const adsHandle = async (id, ads) => {
    const { data } = await axios.patch(
      `https://laptop-bazar.vercel.app/api/seller/ads/${id}`,
      {
        ads,
      }
    );
    if (data.msg) {
      toast.success("Ads Running");
    } else {
      toast.error("Ads Stoped");
    }
    setReLoad(!reLoad);
  };
  useEffect(() => {
    if (rol) {
      setLoder(true);
      const fetchData = async () => {
        const { data } = await axios.get(
          `https://laptop-bazar.vercel.app/api/product/${rol.user._id}`
        );
        setMyProduct(data?.product);
        setLoder(false);
      };
      fetchData();
    }
  }, [reLoad]);

  return (
    <div className="mx-3 my-5">
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
        {myProduct.length === 0 && !loader ? (
          <h1 className="text-xl font-semibold text-center my-10 mx-3">
            Your Product is empty{" "}
          </h1>
        ) : (
          <div className={loader ? "hidden" : "overflow-x-auto w-full"}>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Delete</th>
                  <th>Advertisement</th>
                </tr>
              </thead>
              {myProduct.length > 0 &&
                myProduct.map((item, idx) => (
                  <tbody key={idx}>
                    <tr>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item.imgUrl}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <h1>${item.soldPrice}</h1>
                        </div>
                      </td>
                      <td>
                        <div>
                          <h1>{item.payment ? "Sold" : "Available"}</h1>
                        </div>
                      </td>
                      <td>
                        <div>
                          <button
                            onClick={() => deleteProduct(item._id)}
                            className="btn btn-sm btn-error"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      <td>
                        {!item.payment ? (
                          <div>
                            {item.ads ? (
                              <button
                                onClick={() => adsHandle(item._id, false)}
                                className="btn btn-sm btn-error"
                              >
                                Remove Ads
                              </button>
                            ) : (
                              <button
                                onClick={() => adsHandle(item._id, true)}
                                className="btn btn-sm "
                              >
                                Ads
                              </button>
                            )}
                          </div>
                        ) : (
                          <h1>Can't Ads Run</h1>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default MyProduct;
