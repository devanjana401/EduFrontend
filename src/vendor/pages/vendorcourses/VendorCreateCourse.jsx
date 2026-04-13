import React, { useState, useEffect } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";

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
      alert("Course Created Successfully!");
      navigate("/vendor"); // redirect to vendor courses page
    } catch (error) {
      console.log("Backend validation errors:", error.response?.data);
      alert("Error creating course. Check console for details.");
    }
  };

  return (
    <VendorLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create Course</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          {/* course name */}
          <input
            type="text"
            name="coursename"
            placeholder="Course Name"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* headline */}
          <input
            type="text"
            name="headline"
            placeholder="Headline"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="border p-3 rounded"
            onChange={handleChange}
            required
          />

          {/* category dropdown */}
          <select
            name="category"
            className="border p-3 rounded"
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

          {/* description */}
          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded md:col-span-2"
            onChange={handleChange}
            required
          />

          {/* about */}
          <textarea
            name="about"
            placeholder="About Course"
            className="border p-3 rounded md:col-span-2"
            onChange={handleChange}
            required
          />

          {/* cover photo */}
          <input
            type="file"
            name="coverphoto"
            className="border p-3 rounded md:col-span-2"
            onChange={handleChange}
          />

          {/* submit Button */}
          <button className="bg-blue-600 text-white p-3 rounded md:col-span-2">
            Create Course
          </button>
        </form>
      </div>
    </VendorLayout>
  );
};

export default VendorCreateCourse;