import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await API.get("userside/my-courses/");
      setCourses(res.data);

      res.data.forEach((course) => {
        fetchVideos(course.id);
      });

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (courseId) => {
    try {
      const res = await API.get(`userside/videos/${courseId}/`);
      setVideos((prev) => ({
        ...prev,
        [courseId]: res.data || [],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatch = (courseId, videoId) => {
    navigate(`/watch/${courseId}/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-slate-800">
          My Courses
        </h2>
        <p className="text-slate-500 text-sm">
          Continue learning your purchased courses
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        {loading ? (
          <p>Loading...</p>
        ) : courses.length === 0 ? (
          <p>No purchased courses</p>
        ) : (

          courses.map((course) => (
            <div key={course.id} className="mb-10">

              <h3 className="text-lg font-semibold mb-4">
                {course.coursename}
              </h3>

              <button
                onClick={() => navigate(`/chat/${course.id}`)}
                className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                💬 Chat
              </button>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                {videos[course.id]?.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                  >

                    <video
                      className="w-full h-32 object-cover"
                      src={`http://127.0.0.1:8000${video.video}`}
                    />

                    <div className="p-3">

                      <h4 className="text-sm font-semibold">
                        {video.title}
                      </h4>

                      <button
                        onClick={() => handleWatch(course.id, video.id)} 
                        className="mt-2 w-full bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700"
                      >
                        <FaPlay className="inline mr-1" />
                        Watch
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))

        )}

      </div>

    </div>
  );
};

export default MyCourses;