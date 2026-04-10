import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const VendorVideos = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {

    try {

      const res = await API.get(`/vendorside/vendor-videos/${id}/`);
      setVideos(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <VendorLayout>

      <div className="p-8 bg-gray-50 min-h-screen">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Course Videos
            </h2>

            <p className="text-gray-500 text-sm">
              Manage your course lectures
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/vendor/courses")}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>

            <button
              onClick={() => navigate(`/vendor/course/${id}/upload-video`)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow"
            >
              + Upload Video
            </button>

          </div>

        </div>

        {/* Empty State */}

        {videos.length === 0 && (

          <div className="text-center mt-24 text-gray-500 text-lg">
            No videos uploaded for this course yet
          </div>

        )}

        {/* Videos Grid */}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {videos.map(video => (

            <div
              key={video.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >

              {/* Video */}

              <video
                controls
                className="w-full h-44 object-cover group-hover:scale-[1.02] transition duration-300"
                src={video.video}
              />

              {/* Video Info */}

              <div className="p-4">

                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition">
                  {video.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {video.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </VendorLayout>

  );
};

export default VendorVideos;