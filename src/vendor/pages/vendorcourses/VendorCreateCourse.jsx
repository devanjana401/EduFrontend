import React, { useState, useEffect } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";

const VendorCreateCourse = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState({
    coursename: "",
    headline: "",
    description: "",
    about: "",
    price: "",
    category: "",
    coverphoto: null
  });

  // fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/vendorside/categories/");
      setCategories(res.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setCourse({
      ...course,
      [name]: files ? files[0] : name === "category" ? parseInt(value) : value
    });
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);
  

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare FormData for file upload
    const formData = new FormData();
    Object.keys(course).forEach((key) => {
      formData.append(key, course[key]);
    });

    try {
      const res = await API.post("/vendorside/create-course/", formData);
      console.log("Course created:", res.data);
      showPopup("Course Created Successfully! Redirecting...", "success");
      setTimeout(() => navigate("/vendor"), 2000);
    } catch (error) {
      console.log("Backend validation errors:", error.response?.data);
      showPopup(error.response?.data?.error || "Error creating course", "error");
    }
  };

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100 relative">
          
          <Popup
            message={popupMessage}
            type={popupType}
            isOpen={popupOpen}
            onClose={closePopup}
            autoClose={3000}
          />

          <h2 className="text-2xl font-bold mb-8 text-slate-800 tracking-tight border-b pb-4">
            Create New Course
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* course name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Course Name</label>
              <input
                type="text"
                name="coursename"
                placeholder="Enter course name"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* headline */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Headline</label>
              <input
                type="text"
                name="headline"
                placeholder="Catchy headline"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* price */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* category dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Category</label>
              <select
                name="category"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryname}
                  </option>
                ))}
              </select>
            </div>

            {/* description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 block">Detailed Description</label>
              <textarea
                name="description"
                placeholder="What will students learn?"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px]"
                onChange={handleChange}
                required
              />
            </div>

            {/* about */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 block">About Course</label>
              <textarea
                name="about"
                placeholder="Additional requirements or details"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                onChange={handleChange}
                required
              />
            </div>

            {/* cover photo */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 block">Cover Photo</label>
              <input
                type="file"
                name="coverphoto"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            {/* submit Button */}
            <button className="bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 transition-all text-white font-semibold py-3.5 rounded-xl shadow-lg md:col-span-2 mt-4">
              Create Course
            </button>
          </form>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorCreateCourse;