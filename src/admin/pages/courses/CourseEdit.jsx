import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import API from "../../../services/api";

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

      alert("Updated Successfully ✅");
      navigate("/admin/courses");

    } catch (err) {
      console.log("Update error:", err.response?.data); // 🔥 debug
      alert("Update Failed ❌");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Course</h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            name="coursename"
            value={course.coursename}
            onChange={handleChange}
            placeholder="Course Name"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="headline"
            value={course.headline}
            onChange={handleChange}
            placeholder="Headline"
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows="3"
            required
          />

          <textarea
            name="about"
            value={course.about}
            onChange={handleChange}
            placeholder="About"
            className="w-full border p-2 rounded"
            rows="3"
            required
          />

          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
          >
            Update Course
          </button>

        </form>
      </div>
    </AdminLayout>
  );
};

export default CourseEdit;