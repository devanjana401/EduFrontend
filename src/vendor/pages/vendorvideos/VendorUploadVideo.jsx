import React, { useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const VendorUploadVideo = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState({
    title: "",
    description: "",
    course: id,
    video: null
  });

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

      navigate(`/vendor/course/${id}`);

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
            onChange={handleChange}
            required
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