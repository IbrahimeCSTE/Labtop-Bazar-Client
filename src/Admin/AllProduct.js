import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loader, setLoader] = useState(false);
  const [reLoad, setReLoad] = useState(false);

  const deleteProduct = async (id) => {
    const { data } = await axios.delete(
      `https://server-i8icgxkha-ibrahimecste.vercel.app/api/product/${id}`
    );
    if (data.msg) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
    setReLoad(!reLoad);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const { data } = await axios.get(
        `https://server-i8icgxkha-ibrahimecste.vercel.app/api/all-product`
      );
      setAllProduct(data.product);
      setLoader(false);
    };
    fetchData();
  }, [reLoad]);
  const reportedProduct = allProduct.filter((item) => item.reported);
  //console.log(reportedProduct);
  return (
    <div className="mx-5 my-10">
      <div>
        {loader && <h1 className="mx-5 text-xl font-bold">Loading...</h1>}
      </div>
      {reportedProduct.length > 0 && !loader ? (
        <div>
          <h1 className="mb-5 text-xl font-bold">
            Reported Item({reportedProduct.length})
          </h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {reportedProduct &&
                  reportedProduct.map((item) => (
                    <tr>
                      <td>
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.imgUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <button onClick={() => deleteProduct(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !loader && (
          <div>
            <h1 className="text-xl font-bold mx-5">No Reported Item</h1>
          </div>
        )
      )}
      <Toaster />
    </div>
  );
};

export default AllProduct;
