import React, { useState, useEffect } from "react";
import VendorLayout from "../components/VendorLayout";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import ReactECharts from "echarts-for-react"; // Import ECharts

const VendorDashboard = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [recentVideos, setRecentVideos] = useState([]);

  const [stats] = useState({
    videos: 12,
    students: 250,
    views: 3200,
    earnings: 15000,
  });

  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // chart configurations 
  // 1-line chart: new student enrollment
  const studentGrowthOption = {
    title: { text: "Student Enrollments", left: "center", textStyle: { fontSize: 16 } },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [15, 23, 18, 35, 42, 28, 50],
        type: "line",
        smooth: true,
        areaStyle: { color: "rgba(16, 185, 129, 0.3)" }, // Green area
        itemStyle: { color: "#10b981" },
      },
    ],
  };

  // 2-pie chart: students per course category
  const courseDistributionOption = {
    title: { text: "Students by Category", left: "center", textStyle: { fontSize: 16 } },
    tooltip: { trigger: "item" },
    legend: { bottom: "0" },
    series: [
      {
        name: "Students",
        type: "pie",
        radius: "60%",
        data: [
          { value: 100, name: "Web Dev", itemStyle: { color: "#3b82f6" } },
          { value: 70, name: "Design", itemStyle: { color: "#8b5cf6" } },
          { value: 50, name: "Marketing", itemStyle: { color: "#f59e0b" } },
          { value: 30, name: "Business", itemStyle: { color: "#ef4444" } },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // time and clock logic
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
              className="inline-block mt-4 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition"
            >
              Upload New Video To The Course
            </Link>
          </div>

          <div className="w-full md:w-60 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg p-4">
            <p className="text-2xl text-red-400 font-mono">{time}</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>

        {/* statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Videos" value={stats.videos} color="text-blue-600" />
          <StatCard label="Total Students" value={stats.students} color="text-green-600" />
          <StatCard label="Total Views" value={stats.views} color="text-orange-500" />
          <StatCard label="Total Earnings" value={`₹${stats.earnings}`} color="text-purple-600" />
        </div>

        {/* charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={studentGrowthOption} style={{ height: "300px" }} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={courseDistributionOption} style={{ height: "300px" }} />
          </div>
        </div>

        {/* recent videos table */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Recent Videos</h2>
          <div className="overflow-x-auto">
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
                    <td colSpan="4" className="p-3 text-gray-500 text-center">No recent videos</td>
                  </tr>
                ) : (
                  recentVideos.map(video => (
                    <tr key={video.id} className="text-center">
                      <td className="p-2 border">{video.title}</td>
                      <td className="p-2 border">{video.created_at ? new Date(video.created_at).toLocaleDateString() : "N/A"}</td>
                      <td className="p-2 border">{video.views || 0}</td>
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
      </div>
    </VendorLayout>
  );
};

// small helper component for Stat Cards
const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h3 className="text-gray-500">{label}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default VendorDashboard;