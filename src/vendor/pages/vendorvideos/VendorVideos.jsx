import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const VendorVideos = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchVideos();
    fetchCourse();
  }, [id]);

  const fetchVideos = async () => {
    try {
      const res = await API.get(`/vendorside/vendor-videos/${id}/`);
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/vendorside/course/${id}/`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestApproval = async () => {
    try {
      const res = await API.post(`/vendorside/course/request/${id}/`);
      alert(res.data.message);
      fetchCourse();
    } catch (error) {
      alert(error.response?.data?.error || "Error");
    }
  };

  return (
    <VendorLayout>

      <div className="p-8 bg-gray-50 min-h-screen">

        <div className="flex justify-between mb-6 items-center">

          <h2 className="text-3xl font-bold text-gray-800">
            Course Videos
          </h2>

          <div className="flex gap-3">

            <button
              onClick={() => navigate(`/vendor/course/${id}/upload-video`)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Upload Video
            </button>

            {/* request button */}
            {!course?.publishadmin && (
              <button
                onClick={handleRequestApproval}
                disabled={videos.length === 0 || course?.is_requested}
                className={`px-5 py-2 rounded-lg text-white ${
                  videos.length === 0 || course?.is_requested
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600"
                }`}
              >
                {course?.is_requested ? "Requested" : "Request Approval"}
              </button>
            )}

          </div>

        </div>

        {/* status */}
        {course && (
          <div className="mb-4">
            {course.publishadmin ? (
              <span className="text-green-600 font-semibold">
                Approved Course
              </span>
            ) : course.is_requested ? (
              <span className="text-yellow-600 font-semibold">
                Waiting for admin approval
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                Draft - Upload videos & request approval
              </span>
            )}
          </div>
        )}

        {videos.length === 0 && (
          <p className="text-gray-500">
            No videos uploaded yet
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">

          {videos.map(video => (

            <div key={video.id} className="bg-white p-4 rounded shadow">

              <video
                controls
                className="w-full h-44 object-cover"
                src={`http://localhost:8000${video.video}`}
              />

              <h3 className="font-bold mt-3">
                {video.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {video.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </VendorLayout>
  );
};

export default VendorVideos;