import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get(`userside/videos/${id}/`);
        setVideos(res.data);
      } catch (err) {
        alert("You need to purchase this course",err);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <div>
      <h2>Course Videos</h2>

      {videos.map((video) => (
        <div key={video.id}>
          <h4>{video.title}</h4>

          <video width="400" controls>
            <source src={video.video} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoPlayer;