import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const ViewVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await API.get(`/vendorside/video/${id}/`);
      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!video) return <p className="p-6">Loading...</p>;

  return (
    <VendorLayout>
      <div className="flex justify-start md:items-start items-center mt-4 ml-4 md:w-[40px] w-[60px]">
        <BackButton/>
      </div>
      <div className="p-8">

        <h2 className="text-2xl font-bold mb-4">
          {video.title}
        </h2>

        <video
          controls
          className="w-full max-w-3xl rounded"
          src={`https://educonnectapi.anjanasasi.online${video.video}`}
        />

        <p className="mt-4 text-gray-600">
          {video.description}
        </p>

      </div>
    </VendorLayout>
  );
};

export default ViewVideo;