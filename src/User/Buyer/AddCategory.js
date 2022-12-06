import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const AddCategory = () => {
  const [category, setCategory] = useState("");
  const addCategory = async () => {
    const { data } = await axios.post(
      "https://laptop-bazar.vercel.app/api/category",
      {
        category,
      }
    );
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.msg);
      setCategory("");
    }
  };
  return (
    <div className="my-5 mx-3">
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Add Category"
        className="input input-bordered w-full max-w-xs"
      />
      <button onClick={addCategory} className="btn btn-sm my-3">
        Add
      </button>
      <Toaster />
    </div>
  );
};

export default AddCategory;
