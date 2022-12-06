import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Modal = ({ modalData }) => {
  const rol = JSON.parse(localStorage.getItem("User"));
  const [msg, setMsg] = useState(false);
  const [buyerMobile, setBuyerMobile] = useState("");
  //console.log(modalData);
  const buyerHandle = async (e) => {
    e.preventDefault();
    if (buyerMobile) {
      const { data } = await axios.post(
        "https://laptop-bazar.vercel.app/api/order",
        {
          ProductName: modalData?.name,
          ProductId: modalData?._id,
          imgUrl: modalData?.imgUrl,
          soldPrice: modalData?.soldPrice,
          productCategpry: modalData?.category,
          buyerName: rol?.user.name,
          buyerEmail: rol?.user.email,
          buyerId: rol?.user._id,
          buyerNo: buyerMobile,
          payment: false,
        }
      );
      setMsg(true);
      toast.success(data.msg);
    } else {
      toast.error("Add mobile number!");
      setMsg(false);
    }

    // console.log(data);
  };
  return (
    <div>
      <div>
        <input type="checkbox" id="bookModal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="bookModal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-xl font-bold">{modalData.name}</h3>
            <h3 className="text-lg font-bold">Sold:{modalData.soldPrice}Tk</h3>
            <h3 className="text-lg font-bold">Uses:{modalData.useTime}</h3>
            <h1 className="text-lg font-bold">Mobile:{modalData.mobile}</h1>
            <h1 className="text-lg font-bold">Location{modalData.location}</h1>
            <div className="my-5">
              <h1>Buyer Information</h1>
              <hr />
              <form className="my-5" onSubmit={buyerHandle}>
                <div>
                  <input
                    type="text"
                    value={rol?.user?.name}
                    className="input readOnly  input-bordered my-1 w-full max-w-xs"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={rol?.user?.email}
                    className="input my-1 readOnly  input-bordered  w-full max-w-xs"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={buyerMobile}
                    onChange={(e) => setBuyerMobile(e.target.value)}
                    className="input my-1   input-bordered  w-full max-w-xs"
                    placeholder="Mobile"
                  />
                </div>

                <div>
                  {rol?.user ? (
                    <button disabled={msg} className="btn my-2 btn-sm">
                      Add
                    </button>
                  ) : (
                    <Link to="/user/login" className="btn my-2 btn-sm">
                      Login First
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Modal;
