import React, { useState, useEffect } from "react";
import VendorLayout from "../VendorLayout";
import { Link } from "react-router-dom";

const VendorDashboard = () => {

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [stats] = useState({
    videos: 12,
    students: 250,
    views: 3200,
    earnings: 15000
  });

  const [recentVideos] = useState([
    { id: 1, title: "React Basics", date: "2026/04/01", views: 350 },
    { id: 2, title: "Django REST API", date: "2026/03/28", views: 290 },
    { id: 3, title: "Python for Beginners", date: "2026/03/25", views: 410 }
  ]);

  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

  return (
    <VendorLayout>

      <div className="p-6 bg-gray-100 min-h-screen">

        {/* Welcome Section */}

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <div className="flex-1 bg-gray-800 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">Hello Vendor</h1>
            <p className="text-xl text-green-400">Welcome to Vendor Dashboard</p>
            <p className="mt-2">Upload videos and track student engagement.</p>

            <Link
              to="/vendor/upload-video"
              className="inline-block mt-4 bg-blue-500 px-4 py-2 rounded text-white"
            >
              Upload New Video
            </Link>
          </div>

          <div className="w-full md:w-60 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg p-4">
            <p className="text-2xl text-red-400">{time}</p>
            <p className="text-sm">{date}</p>
          </div>

        </div>

        {/* Statistics Cards */}

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

        {/* Recent Videos Table */}

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-4">Recent Videos</h2>

          <table className="w-full border">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Upload Date</th>
                <th className="p-2 border">Views</th>
              </tr>
            </thead>

            <tbody>

              {recentVideos.map(video => (

                <tr key={video.id} className="text-center">

                  <td className="p-2 border">{video.title}</td>
                  <td className="p-2 border">{video.date}</td>
                  <td className="p-2 border">{video.views}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </VendorLayout>
  );
};

export default VendorDashboard;