import React, { useState, useEffect } from "react";
import VendorLayout from "../components/VendorLayout";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const VendorDashboard = () => {

  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [stats] = useState({
    videos: 12,
    students: 250,
    views: 3200,
    earnings: 15000
  });

  // dynamic recent videos
  const [recentVideos, setRecentVideos] = useState([]);

  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // time
  useEffect(() => {

    const updateTime = () => {
      const now = new Date();

      const currentTime =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0") + ":" +
        String(now.getSeconds()).padStart(2, "0");

      const currentDate =
        now.getFullYear() + "/" +
        String(now.getMonth() + 1).padStart(2, "0") + "/" +
        String(now.getDate()).padStart(2, "0") +
        " " + WEEK[now.getDay()];

      setTime(currentTime);
      setDate(currentDate);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);

  }, []);

  // fetch recent videos
  useEffect(() => {
    fetchRecentVideos();
  }, []);

  const fetchRecentVideos = async () => {
    try {
      const res = await API.get("/vendorside/recent-videos/");
      setRecentVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // optional actions
  const handleView = (id) => {
    navigate(`/vendor/video/${id}`);
  };

  return (
    <VendorLayout>

      <div className="p-6 bg-gray-100 min-h-screen">

        {/* welcome section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <div className="flex-1 bg-gray-800 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">Hello Vendor</h1>
            <p className="text-xl text-green-400">Welcome to Vendor Dashboard</p>
            <p className="mt-2">Upload videos and track student engagement.</p>

            <Link
              to="/vendor/courses"
              className="inline-block mt-4 bg-blue-500 px-4 py-2 rounded text-white"
            >
              Upload New Video To The Course
            </Link>
          </div>

          <div className="w-full md:w-60 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg p-4">
            <p className="text-2xl text-red-400">{time}</p>
            <p className="text-sm">{date}</p>
          </div>

        </div>

        {/* statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Total Videos</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.videos}</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Total Students</h3>
            <p className="text-3xl font-bold text-green-600">{stats.students}</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Total Views</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.views}</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Total Earnings</h3>
            <p className="text-3xl font-bold text-purple-600">₹{stats.earnings}</p>
          </div>

        </div>

        {/* recent videos table */}
        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-4">Recent Videos</h2>

          <table className="w-full border">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Upload Date</th>
                <th className="p-2 border">Views</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>

              {recentVideos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-3 text-gray-500 text-center">
                    No recent videos
                  </td>
                </tr>
              ) : (
                recentVideos.map(video => (

                  <tr key={video.id} className="text-center">

                    <td className="p-2 border">{video.title}</td>

                    <td className="p-2 border">
                      {video.created_at
                        ? new Date(video.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-2 border">
                      {video.views || 0}
                    </td>

                    <td className="p-2 border">
                      <button
                        onClick={() => handleView(video.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </VendorLayout>
  );
};

export default VendorDashboard;