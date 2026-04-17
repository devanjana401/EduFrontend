import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await API.get(`/vendorside/video/${id}/`);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        video: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, video: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.video) {
      data.append("video", formData.video);
    }

    try {
      await API.put(`/vendorside/video-update/${id}/`, data);
      alert("Video updated successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VendorLayout>
      <div className="p-8 max-w-xl">

        <h2 className="text-2xl font-bold mb-4">
          Edit Video
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            name="video"
            onChange={handleChange}
            className="w-full"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Video
          </button>

        </form>

      </div>
    </VendorLayout>
  );
};

export default EditVideo;