import React, { useState } from "react";
import AllProduct from "./AllProduct";
import BuyerAdmin from "./BuyerAdmin";
import CategoryAdmin from "./CategoryAdmin";
import SellerAdmin from "./SellerAdmin";

const Admin = () => {
  const [allCategory, setAllCategory] = useState(false);
  const [allBuyer, setAllBuyer] = useState(false);
  const [allSeller, setAllSeller] = useState(false);
  const [allProduct, setAllProduct] = useState(true);

  const categoryHandle = () => {
    setAllCategory(true);
    setAllBuyer(false);
    setAllSeller(false);
    setAllProduct(false);
  };
  const buyerHandle = () => {
    setAllCategory(false);
    setAllBuyer(true);
    setAllSeller(false);
    setAllProduct(false);
  };
  const sellerHandle = () => {
    setAllCategory(false);
    setAllBuyer(false);
    setAllSeller(true);
    setAllProduct(false);
  };
  const productHandle = () => {
    setAllCategory(false);
    setAllBuyer(false);
    setAllSeller(false);
    setAllProduct(true);
  };
  return (
    <div className=" max-w-screen-xl mx-auto ">
      <div className="my-5">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div className="lg:flex my-5">
        <div className="card shadow-lg p-10">
          <ul>
            <li className="font-semibold my-2 text-xl">
              <button onClick={categoryHandle}>Category</button>
            </li>
            <li className="font-semibold my-2 text-xl">
              <button onClick={buyerHandle}>All Buyer</button>
            </li>
            <li className="font-semibold my-2 text-xl">
              <button onClick={sellerHandle}>All seller</button>
            </li>
            <li className="font-semibold my-2 text-xl">
              <button onClick={productHandle}>Reported Items</button>
            </li>
          </ul>
        </div>
        <div>{allCategory && <CategoryAdmin />}</div>
        <div>{allBuyer && <BuyerAdmin />}</div>
        <div>{allSeller && <SellerAdmin />}</div>
        <div>{allProduct && <AllProduct />}</div>
      </div>
    </div>
  );
};

export default Admin;
