import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const AddProduct = ({ setAddProduct, setMyProduct, setAddCategory }) => {
  const [imgUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [useTime, setUseTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [productCategory, setProductCategory] = useState([]);
  const rol = JSON.parse(localStorage.getItem("User"));

  const handleImageUpload = async (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const data = new FormData();
    data.append("file", imageFile);
    //your folder name
    data.append("upload_preset", "WinnerImg");
    data.append("cloud_name", "ditdynru4");

    try {
      const result = await axios.post(
        //aykhne [Your Cloudinary Cloud Name] baki link thik thak thakbe
        "https://api.cloudinary.com/v1_1/ditdynru4/image/upload",
        data
      );
      //console.log(result?.data?.url);
      setImageUrl(result?.data?.url);
      setLoading(false);
    } catch (error) {
      toast.error(error.massage);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://laptop-bazar.vercel.app/api/category"
      );
      setProductCategory(data.category);
      // const updateLoginUser = await axios.get(
      //   `https://laptop-bazar.vercel.app/api/all-user/${rol?.user._id}`
      // );
      // // console.log(updateLoginUser.data.user.verified);
      // rol.user["verified"] = updateLoginUser.data.user.verified;
      // localStorage.setItem("User", JSON.stringify(rol));
    };
    fetchData();
  }, []);
  const handleProuct = async (e) => {
    e.preventDefault();
    if (
      !imgUrl &&
      !name &&
      !buyPrice &&
      !soldPrice &&
      !condition &&
      !mobile &&
      !location &&
      !category &&
      !des &&
      !useTime
    ) {
      toast.error("Fillup the all field");
      return;
    }
    const { data } = await axios.post(
      "https://laptop-bazar.vercel.app/api/product",
      {
        imgUrl,
        name,
        buyPrice,
        soldPrice,
        condition,
        mobile,
        location,
        category,
        des,
        useTime,
        sold: false,
        userId: rol?.user?._id,
        verified: rol?.user?.verified,
        sellerName: rol?.user?.name,
        date: new Date(),
      }
    );
    toast.success(data.msg);
    setImageUrl("");
    setBuyPrice("");
    setSoldPrice("");
    setName("");
    setCategory("");
    setCondition("");
    setDes("");
    setMobile("");
    setLocation("");
    setMyProduct(true);
    setAddCategory(false);
    setAddProduct(false);
  };
  return (
    <div className="mx-4">
      <h1 className="text-2xl my-5">Add Product</h1>
      <form onSubmit={handleProuct}>
        <div>
          <input
            type="file"
            onChange={handleImageUpload}
            placeholder="Product Picture"
            className="input input-bordered my-2 pt-2 w-full max-w-xs"
          />
          {loading && (
            <h1 className="text-xl text-info font-semibold">Uploading...</h1>
          )}
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input input-bordered my-2 w-full max-w-xs"
          />
        </div>
        <div>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="Buy Price"
            className="input input-bordered my-2 w-full max-w-xs"
          />
        </div>
        <div>
          <input
            type="number"
            value={soldPrice}
            onChange={(e) => setSoldPrice(e.target.value)}
            placeholder="Sold Price"
            className="input input-bordered my-2 w-full max-w-xs"
          />
        </div>
        <div>
          <select
            onChange={(e) => setCondition(e.target.value)}
            className="select my-2 w-full max-w-xs input-bordered"
          >
            <option disabled selected>
              Condition
            </option>
            <option value="Excellent">excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile"
            className="input input-bordered my-2 w-full max-w-xs"
          />
        </div>
        <div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="input input-bordered my-2 w-full max-w-xs"
          />
        </div>
        <div>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="select my-2 w-full max-w-xs input-bordered"
          >
            <option disabled selected>
              Category
            </option>
            {productCategory &&
              productCategory.map((item, idx) => (
                <option value={item.category} key={idx}>
                  {item.category}
                </option>
              ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            placeholder="Description"
            className="input input-bordered my-2 w-full max-w-xs"
          />
        </div>
        <div>
          <input
            type="number"
            value={useTime}
            onChange={(e) => setUseTime(e.target.value)}
            placeholder="Uses Time"
            className="input input-bordered my-2 w-full max-w-xs"
          />
        </div>
        <button className="btn btn-sm my-3">Add</button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddProduct;
