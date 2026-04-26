import React, { useState, useEffect } from "react";
import VendorLayout from "../components/VendorLayout";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import ReactECharts from "echarts-for-react";

const VendorDashboard = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [recentVideos, setRecentVideos] = useState([]);

  const [stats, setStats] = useState({
    courses: 0,
    videos: 0,
    students: 0,
    purchases: 0,
    earnings: 0,
  });

  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // fetch data
  useEffect(() => {
    fetchDashboard();
    fetchRecentVideos();
  }, []);

  const fetchDashboard = async () => {
    try {

      const res = await API.get("vendorside/vendor/dashboard-counts/");

      console.log("✅ API RESPONSE:", res.data);

      setStats({
        courses: res.data.courses ?? 0,
        videos: res.data.videos ?? 0,
        students: res.data.students ?? 0,
        purchases: res.data.purchases ?? 0,
        earnings: res.data.earnings ?? 0,
      });

    } catch (err) {
      console.error("❌ Dashboard Error:", err.response || err);
    }
  };

  // charts
  const barChartOption = {
    title: { text: "Vendor Overview", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Courses", "Students", "Purchases", "Earnings"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [
          stats.courses,
          stats.students,
          stats.purchases,
          stats.earnings,
        ],
        type: "bar",
        itemStyle: { color: "#10b981" },
      },
    ],
  };

  const donutChartOption = {
    title: { text: "Vendor Data", left: "center" },
    tooltip: { trigger: "item" },
    legend: { bottom: "0" },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          { value: stats.courses, name: "Courses" },
          { value: stats.students, name: "Students" },
          { value: stats.purchases, name: "Purchases" },
          { value: stats.earnings, name: "Earnings" },
        ],
      },
    ],
  };

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

  // recent videos
  const fetchRecentVideos = async () => {
    try {
      const res = await API.get("/vendorside/recent-videos/");
      setRecentVideos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (id) => {
    navigate(`/vendor/video/${id}`);
  };

  return (
    <VendorLayout>
      <div className="p-6 bg-gray-100 min-h-screen">

        {/* Welcome */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-gray-800 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">Hello Vendor</h1>
            <p className="text-xl text-green-400">Welcome to Vendor Dashboard</p>

            <Link
              to="/vendor/courses"
              className="inline-block mt-4 bg-blue-500 px-4 py-2 rounded text-white"
            >
              Manage Courses
            </Link>
          </div>

          <div className="w-full md:w-60 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg p-4">
            <p className="text-2xl text-red-400">{time}</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Courses" value={stats.courses} color="text-blue-600" />
          <StatCard label="Videos" value={stats.videos} color="text-blue-600" />
          <StatCard label="Students" value={stats.students} color="text-green-600" />
          <StatCard label="Purchases" value={stats.purchases} color="text-orange-500" />
          <StatCard label="Earnings" value={`₹${stats.earnings}`} color="text-purple-600" />
        </div>

        {/* charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={barChartOption} style={{ height: "300px" }} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={donutChartOption} style={{ height: "300px" }} />
          </div>
        </div>

        {/* recent videos */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Recent Videos</h2>

          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Views</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {recentVideos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-3 text-center">
                    No videos
                  </td>
                </tr>
              ) : (
                recentVideos.map((v) => (
                  <tr key={v.id} className="text-center">
                    <td className="p-2 border">{v.title}</td>
                    <td className="p-2 border">
                      {v.created_at
                        ? new Date(v.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-2 border">{v.views || 0}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleView(v.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
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

const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h3>{label}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default VendorDashboard;