import React, { useState } from "react";
import AddCategory from "./Buyer/AddCategory";
import AddProduct from "./Buyer/AddProduct";
import MyProduct from "./Buyer/MyProduct";

const Seller = () => {
  const [myProduct, setMyProduct] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  const categoryHandle = () => {
    setAddCategory(true);
    setAddProduct(false);
    setMyProduct(false);
  };
  const productHandle = () => {
    setAddCategory(false);
    setAddProduct(true);
    setMyProduct(false);
  };
  const myProductHandle = () => {
    setAddCategory(false);
    setAddProduct(false);
    setMyProduct(true);
  };
  //console.log(addCategory, addProduct, myProduct);
  return (
    <div>
      <div class=" lg:flex">
        <div className="card border h-full mx-10 my-4">
          <ul className="menu  drawerMenu p-4 bg-base-100 text-base-content">
            <div className="">
              <div>
                <button className="btn btn-sm m-2" onClick={categoryHandle}>
                  Add Category
                </button>
              </div>
              <div>
                <button className="btn btn-sm m-2" onClick={productHandle}>
                  Add Product
                </button>
              </div>
              <div>
                <button className="btn btn-sm m-2" onClick={myProductHandle}>
                  My Product
                </button>
              </div>
            </div>
          </ul>
        </div>

        <div className="my-4">
          {myProduct && <MyProduct />}
          {addProduct && (
            <AddProduct
              setAddProduct={setAddProduct}
              setMyProduct={setMyProduct}
              setAddCategory={setAddCategory}
            />
          )}

          {addCategory && <AddCategory />}
        </div>
      </div>
    </div>
  );
};

export default Seller;
