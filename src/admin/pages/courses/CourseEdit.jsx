import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import API from "../../../services/api";
import BackButton from "../../../components/BackButton";
import Popup from "../../../components/Popup";

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    coursename: "",
    headline: "",
    description: "",
    about: "",
    price: "",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  // fetch course data 
  const fetchCourse = async () => {
    try {
      const res = await API.get(`vendorside/course/${id}/`);

      setCourse({
        coursename: res.data.coursename || "",
        headline: res.data.headline || "",
        description: res.data.description || "",
        about: res.data.about || "",
        price: res.data.price || "",
      });

    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // handle input change
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
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

  // update course (PATCH + only required fields)
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = {
        coursename: course.coursename,
        headline: course.headline,
        description: course.description,
        about: course.about,
        price: course.price,
      };

      await API.patch(`vendorside/course/update/${id}/`, data);

      showPopup("Updated Successfully ✅", "success");
      setTimeout(() => navigate("/admin/courses"), 2000);

    } catch (err) {
      console.log("Update error:", err.response?.data); // 🔥 debug
      showPopup(err.response?.data?.error || "Update Failed ❌", "error");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-start md:items-start items-center mb-2 md:w-[40px] w-[60px] ">
        <BackButton/>
      </div>
      <div className="p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100 relative">

          <Popup
            message={popupMessage}
            type={popupType}
            isOpen={popupOpen}
            onClose={closePopup}
            autoClose={3000}
          />

          <h2 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">Edit Course</h2>

          <form onSubmit={handleUpdate} className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Course Name</label>
              <input
                type="text"
                name="coursename"
                value={course.coursename}
                onChange={handleChange}
                placeholder="Course Name"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Headline</label>
              <input
                type="text"
                name="headline"
                value={course.headline}
                onChange={handleChange}
                placeholder="Headline"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Description</label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">About</label>
              <textarea
                name="about"
                value={course.about}
                onChange={handleChange}
                placeholder="About"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Price</label>
              <input
                type="number"
                name="price"
                value={course.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 mt-4"
            >
              Update Course
            </button>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CourseEdit;