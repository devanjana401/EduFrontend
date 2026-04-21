import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { courseId, videoId } = useParams();

  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, [courseId, videoId]);

  const fetchVideos = async () => {
    try {
      const res = await API.get(`userside/videos/${courseId}/`);
      setVideos(res.data);

      const selected = res.data.find(v => v.id == videoId);
      setCurrentVideo(selected);

    } catch (err) {
      alert("You need to purchase this course",err);
    }
  };

  if (!currentVideo) return <p>Loading...</p>;

  return (
    <div className="p-6">

      {/* main video */}
      <h2 className="text-xl font-bold mb-4">
        {currentVideo.title}
      </h2>

      <video
        controls
        autoPlay
        className="w-full max-w-4xl mb-6"
        src={`http://127.0.0.1:8000${currentVideo.video}`}
      />

      {/* playlist */}
      <div className="grid md:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setCurrentVideo(video)}
            className={`cursor-pointer p-2 rounded border ${
              currentVideo.id === video.id
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <p className="text-sm">{video.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default VideoPlayer;