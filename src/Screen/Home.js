import axios from "axios";
import React, { useEffect, useState } from "react";
import CarouselSlider from "../Component/Header/CarouselSlider";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import Adsvertisement from "./Adsvertisement";
import ReactCardFlip from "react-card-flip";
import Footer from "../Component/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";
import Faq from "./Faq";
import CountUpComponent from "./CountUp";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [loader, setLoder] = useState(false);
  const [flip, setFlip] = useState(false);
  const [flipId, setFlipId] = useState(0);
  const [sortProduct, setSortProduct] = useState("1");
  const [reLoad, setReLoad] = useState(false);

  const reportedItem = async (id) => {
    if (window.confirm("Do you want reported")) {
      const { data } = await axios.patch(
        `https://server-i8icgxkha-ibrahimecste.vercel.app/api/user/report/${id}`
      );
      toast.success(data.msg);
      setReLoad(!loader);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoder(true);
      const { data } = await axios.get(
        `https://server-i8icgxkha-ibrahimecste.vercel.app/api/all-product`
      );
      if (sortProduct === "1") {
        setAllProduct(data?.product.reverse());
      } else if (sortProduct === "2") {
        setAllProduct(
          data?.product.sort((a, b) => (a.soldPrice > b.soldPrice ? 1 : -1))
        );
      } else if (sortProduct === "3") {
        setAllProduct(
          data?.product.sort((a, b) => (a.soldPrice > b.soldPrice ? -1 : 1))
        );
      }

      setLoder(false);
      const res = await axios.get(
        `https://server-i8icgxkha-ibrahimecste.vercel.app/api/category`
      );
      setCategory(res.data.category);
      //console.log(data?.product);
    };
    fetchData();
  }, [modalData, sortProduct, reLoad]);

  const bookingData = (item) => {
    setModalData(item);
    setShowModal(true);
  };
  const handleCard = (id) => {
    setFlip(!flip);
    setFlipId(id);
  };

  //  console.log(sortProduct);
  return (
    <div>
      <CarouselSlider />
      <CountUpComponent />
      <Adsvertisement />
      <div>
        <div className="productHeader mx-10">
          <h1 className="text-2xl my-1 font-bold">Product</h1>
          <hr />
          <select
            onChange={(e) => setSortProduct(e.target.value)}
            className="select select-bordered  my-2 select-ghost w-48 max-w-xs"
          >
            <option disabled selected>
              Short
            </option>
            <option value="1">Latest Item</option>
            <option value="2">Low Price</option>
            <option value="3">High Price</option>
          </select>
        </div>
        <div className="lg:flex my-10">
          <div className="category mx-4">
            <div className="card mb-5 bg-neutral text-neutral-content w-60 shadow-xl mx-auto max-w-screen-sm">
              <div className="card-body">
                {category?.length > 0 ? (
                  category.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/category/${item._id}`}
                      className="btn btn-primary"
                    >
                      {item.category}
                    </Link>
                  ))
                ) : (
                  <h1>No Category</h1>
                )}
              </div>
            </div>
          </div>
          <div className="productSection">
            <div>
              {loader && (
                <div className="text-center">
                  <div role="status">
                    <svg
                      className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="homeProduct place-content-center grid md:grid-cols-3 max-w-screen-xl ml-5 mr-5 mx-auto lg:grid-cols-3 gap-4">
              {allProduct.length > 0 && !loader
                ? allProduct.map((item, idx) => (
                    <ReactCardFlip
                      key={idx}
                      isFlipped={flipId === idx && flip}
                      flipDirection="vertical"
                      cardZIndex="auto"
                    >
                      <div>
                        <div className="card p-2  bg-base-100 shadow-xl">
                          <figure className="px-5">
                            <img
                              src={item.imgUrl}
                              alt="laptop"
                              className="rounded-xl w-full"
                            />
                          </figure>
                          <div className="card-body text-md font-semibold">
                            <div>
                              {item.verified ? (
                                <div className="flex">
                                  <div className="verifyIcon">
                                    <i className="fas  fa-check-circle"></i>
                                  </div>
                                  <div>
                                    <h1>{item?.sellerName}</h1>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h1>Seller:{item?.sellerName}</h1>
                                </div>
                              )}
                            </div>
                            <h2 className="card-title">{item.name}</h2>
                            <h1 className="">Buy:{item.buyPrice}</h1>
                            <h1 className="text-bold text-lg  text-primary">
                              Sold:{item.soldPrice}
                            </h1>
                            <h1>Contact:{item.mobile}</h1>
                            <h1>Location:{item.location}</h1>
                            <div>
                              {item.payment ? (
                                <h1 className="text-error font-bold">
                                  {" "}
                                  Status:Sold
                                </h1>
                              ) : (
                                <h1 className=" font-bold">Status:Available</h1>
                              )}
                            </div>
                            <div style={{ cursor: "pointer" }}>
                              {item.reported ? (
                                <i
                                  onClick={() => reportedItem(item._id)}
                                  className="fas text-error fa-flag"
                                  title="Reported Iteam"
                                ></i>
                              ) : (
                                <i
                                  onClick={() => reportedItem(item._id)}
                                  className="fas fa-flag"
                                ></i>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleCard(idx)}
                            className="btn btn-md"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                      <div onMouseLeave={() => handleCard(idx)}>
                        <div className="card p-2  bg-violet-900 text-white shadow-xl">
                          <figure className="px-10">
                            <img
                              src={item.imgUrl}
                              alt="laptop"
                              className="rounded-xl w-full"
                            />
                          </figure>
                          <div className="card-body text-md font-semibold">
                            <h1>Uses:{item.useTime}year</h1>
                            <h1>Condition:{item.condition}</h1>
                            <h1>Descriptiom:{item.des}</h1>
                            <div className="card-actions">
                              {item.payment ? (
                                <label
                                  disabled
                                  onClick={() => bookingData(item)}
                                  htmlFor="bookModal"
                                  className="btn text-white"
                                >
                                  Book Now
                                </label>
                              ) : (
                                <label
                                  onClick={() => bookingData(item)}
                                  htmlFor="bookModal"
                                  className="btn  btn-primary"
                                >
                                  Book Now
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ReactCardFlip>
                  ))
                : !loader && (
                    <div>
                      <h1 className="text-xl font-bold mx-5">
                        No Product Available
                      </h1>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {showModal && (
          <Modal setModalData={setModalData} modalData={modalData} />
        )}
      </div>
      <Faq />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Home;
