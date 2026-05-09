import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import BackButton from "../../../components/BackButton";

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

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

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
      showPopup("Video updated successfully", "success");
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      console.log(error);
      showPopup(error.response?.data?.error || "Update failed", "error");
    }
  };

  return (
    <VendorLayout>
      <div className="flex justify-start md:items-start items-center mt-4 ml-4 md:w-[40px] w-[60px]">
        <BackButton/>
      </div>
      <div className="p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100 relative">

          <Popup
            message={popupMessage}
            type={popupType}
            isOpen={popupOpen}
            onClose={closePopup}
            autoClose={3000}
          />

          <h2 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">
            Edit Video
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Video Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border border-slate-200 p-3 rounded-xl min-h-[120px] focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Update Video File</label>
              <input
                type="file"
                name="video"
                onChange={handleChange}
                className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 mt-4"
            >
              Update Video
            </button>

          </form>

        </div>
      </div>
    </VendorLayout>
  );
};

export default EditVideo;