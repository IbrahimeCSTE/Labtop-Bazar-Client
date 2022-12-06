import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
const CountUpComponent = () => {
  const [product, setProduct] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://laptop-bazar.vercel.app/api/all-product`
      );
      setProduct(data?.product);
      const buyer = await axios.get(
        `https://laptop-bazar.vercel.app/api/all-buyer`
      );
      setBuyer(buyer?.data?.buyer);
      const res = await axios.get(
        `https://laptop-bazar.vercel.app/api/category`
      );
      setCategory(res.data.category);
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <div className="-mt-16 md:w-3/4  lg:w-3/4 mb-10 max-w-screen-lg mx-auto card w-96 bg-base-100 shadow-xl">
        <div className="flex text-center justify-around py-5">
          <div className="">
            <h1 className="text-2xl font-bold">Product</h1>
            <h1 className="text-xl font-bold">
              <CountUp delay={0} start={0} end={product.length} />
            </h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Buyer</h1>
            <h1 className="text-xl font-bold">
              <CountUp delay={0} start={0} end={buyer.length} />
            </h1>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Category</h1>
            <h1 className="text-xl font-bold">
              <CountUp delay={0} start={0} end={category.length} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountUpComponent;
