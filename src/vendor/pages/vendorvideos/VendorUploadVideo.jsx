import React, { useState, useEffect } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";

const VendorUploadVideo = () => {

  const [courses, setCourses] = useState([]);

  const [video, setVideo] = useState({
    title: "",
    description: "",
    course: "",
    video: null
  });

  // Fetch vendor courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/vendorside/vendor-courses/");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setVideo({
      ...video,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    Object.keys(video).forEach(key => {
      formData.append(key, video[key]);
    });

    try {

      await API.post("/vendorside/upload-video/", formData);

      alert("Video Uploaded");

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <VendorLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">Upload Video</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Video Title"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          />

          {/* Course Dropdown */}
          <select
            name="course"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          >
            <option value="">Select Course</option>

            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.coursename}
              </option>
            ))}

          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          />

          <input
            type="file"
            name="video"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Upload Video
          </button>

        </form>

      </div>

    </VendorLayout>

  );
};

export default VendorUploadVideo;