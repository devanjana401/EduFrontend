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
  }, [id]);

  const fetchVideos = async () => {

    try {

      const res = await API.get(`/vendorside/vendor-videos/${id}/`);

      console.log("VIDEOS:", res.data);

      setVideos(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <VendorLayout>

      <div className="p-8 bg-gray-50 min-h-screen">

        <div className="flex justify-between mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Course Videos
          </h2>

          <button
            onClick={() => navigate(`/vendor/course/${id}/upload-video`)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Upload Video
          </button>

        </div>

        {videos.length === 0 && (
          <p className="text-gray-500">
            No videos uploaded yet
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">

          {videos.map(video => (

            <div
              key={video.id}
              className="bg-white p-4 rounded shadow"
            >

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