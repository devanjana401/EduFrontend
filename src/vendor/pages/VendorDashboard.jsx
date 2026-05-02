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

  useEffect(() => {
    fetchDashboard();
    fetchRecentVideos();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("vendorside/vendor/dashboard-counts/");
      setStats({
        courses: res.data.courses ?? 0,
        videos: res.data.videos ?? 0,
        students: res.data.students ?? 0,
        purchases: res.data.purchases ?? 0,
        earnings: res.data.earnings ?? 0,
      });
    } catch (err) {
      console.error("Dashboard Error:", err.response || err);
    }
  };

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

  // time logic
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
          <div className="flex-1 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Hello Vendor</h1>
            <p className="text-xl text-green-400">Welcome to Vendor Dashboard</p>

            <div className="flex gap-3 mt-4">
              <Link
                to="/vendor/courses"
                className="bg-blue-500 px-6 py-2 rounded text-white font-semibold hover:bg-blue-600 transition"
              >
                Manage Courses
              </Link>
            </div>
          </div>

          <div className="w-full md:w-60 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg p-4 shadow-lg">
            <p className="text-2xl text-red-400 font-mono">{time}</p>
            <p className="text-sm uppercase tracking-wider">{date}</p>
          </div>
        </div>

        {/* stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Courses" value={stats.courses} color="text-blue-600" />
          <StatCard label="Videos" value={stats.videos} color="text-blue-600" />
          <StatCard label="Students" value={stats.students} color="text-green-600" />
          <StatCard label="Purchases" value={stats.purchases} color="text-orange-500" />
          <StatCard label="Earnings" value={`₹${stats.earnings}`} color="text-purple-600" />
        </div>

        {/* charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow-md">
            <ReactECharts option={barChartOption} style={{ height: "300px" }} />
          </div>

          <div className="bg-white p-4 rounded shadow-md">
            <ReactECharts option={donutChartOption} style={{ height: "300px" }} />
          </div>
        </div>

        {/* recent videos table */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Videos</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border text-left text-gray-600">Title</th>
                  <th className="p-3 border text-center text-gray-600">Date</th>
                  <th className="p-3 border text-center text-gray-600">Views</th>
                  <th className="p-3 border text-center text-gray-600">Action</th>
                </tr>
              </thead>

              <tbody>
                {recentVideos.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-400">
                      No videos uploaded recently.
                    </td>
                  </tr>
                ) : (
                  recentVideos.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border font-medium">{v.title}</td>
                      <td className="p-3 border text-center">
                        {v.created_at
                          ? new Date(v.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-3 border text-center">{v.views || 0}</td>
                      <td className="p-3 border text-center">
                        <button
                          onClick={() => handleView(v.id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
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

const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded shadow-sm text-center border-b-4 border-gray-100">
    <h3 className="text-gray-500 text-sm uppercase font-semibold">{label}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default VendorDashboard;