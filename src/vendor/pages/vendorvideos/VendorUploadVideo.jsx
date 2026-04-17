import React, { useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const VendorUploadVideo = () => {

  const { id } = useParams();   // course id
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    video: null
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setVideoData({
      ...videoData,
      [name]: files ? files[0] : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", videoData.title);
    formData.append("description", videoData.description);
    formData.append("video", videoData.video);
    formData.append("course", id);   

    try {

      const res = await API.post(
        "/vendorside/upload-video/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Uploaded:", res.data);

      alert("Video Uploaded Successfully");

      navigate(`/vendor/course/${id}`);

    } catch (error) {

      console.log("Upload Error:", error.response?.data || error);

    }

  };

  return (

    <VendorLayout>

      <div className="p-8 bg-gray-50 min-h-screen">

        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Upload Video
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Video Title"
              className="border p-3 rounded w-full"
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              className="border p-3 rounded w-full"
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="video"
              className="border p-3 rounded w-full"
              accept="video/*"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full"
            >
              Upload Video
            </button>

          </form>

        </div>

      </div>

    </VendorLayout>

  );
};

export default VendorUploadVideo;