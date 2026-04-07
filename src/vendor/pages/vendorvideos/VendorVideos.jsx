import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";

const VendorVideos = () => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {

    const fetchVideos = async () => {

      const res = await API.get("/vendor/videos/");

      setVideos(res.data);

    };

    fetchVideos();

  }, []);

  return (

    <VendorLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">My Videos</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {videos.map(video => (

            <div key={video.id} className="bg-white p-4 shadow rounded">

              <video
                controls
                className="w-full h-40 object-cover"
                src={video.video}
              />

              <h3 className="font-bold mt-2">{video.title}</h3>

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