import React, { useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import BackButton from "../../../components/BackButton";

const VendorUploadVideo = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    video: null
  });

  const [uploading, setUploading] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setVideoData({
      ...videoData,
      [name]: files ? files[0] : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setUploading(true);

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

      showPopup("Video Uploaded Successfully", "success");

      setTimeout(() => {
        navigate(`/vendor/course/${id}`);
      }, 2000);

    } catch (error) {

      console.log("Upload Error:", error.response?.data || error);

      showPopup(
        error.response?.data?.error || "Error uploading video",
        "error"
      );

    } finally {

      setUploading(false);

    }

  };

  return (

    <VendorLayout>

      <div className="flex justify-start md:items-start items-center mt-4 ml-4 md:w-[40px] w-[60px]">
        <BackButton />
      </div>

      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">

        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100 relative">

          <Popup
            message={popupMessage}
            type={popupType}
            isOpen={popupOpen}
            onClose={closePopup}
            autoClose={3000}
          />

          <h2 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">
            Upload Video
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="title"
              placeholder="Video Title"
              className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px]"
              onChange={handleChange}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">
                Video File
              </label>

              <input
                type="file"
                name="video"
                className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                accept="video/*"
                onChange={handleChange}
                required
              />
            </div>

            {uploading && (
              <p className="text-sm text-blue-600 font-medium text-center">
                Uploading video, please wait...
              </p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className={`w-full text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 ${
                uploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
              }`}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </button>

          </form>

        </div>

      </div>

    </VendorLayout>

  );

};

export default VendorUploadVideo;