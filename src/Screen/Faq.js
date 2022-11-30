import React from "react";

const Faq = () => {
  return (
    <div>
      <div className="my-4 mx-10">
        <h1 className="my-2 text-xl font-bold">Frequently Asked Question</h1>
        <hr />
      </div>
      <div className="my-5 p-5 max-w-screen-lg mx-auto w-full">
        <div
          tabIndex={0}
          className="collapse my-3 collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title text-xl font-medium">
            What is our payment system?
          </div>
          <div className="collapse-content">
            <p>You can payment only stripe online payment system.</p>
          </div>
        </div>
        <div
          tabIndex={0}
          className="collapse my-3 collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title text-xl font-medium">
            Cash on delivary system is available?
          </div>
          <div className="collapse-content">
            <p>No.</p>
          </div>
        </div>
        <div
          tabIndex={0}
          className="collapse my-3 collapse-plus border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title text-xl font-medium">
            Can I return a product?
          </div>
          <div className="collapse-content">
            <p>Yes.But it has a valid reason.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
