import React from "react";

const Buyer = () => {
  return (
    <div className="my-10 mx-5 lg:mx-10">
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
            <tr>
              <td>
                <div className="">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>$200</td>
              <td>
                <button className="btn  btn-primary btn-sm">Pay</button>
              </td>
              <td>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buyer;
