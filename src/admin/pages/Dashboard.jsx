import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import BackButton from "../../components/BackButton";
import ReactECharts from "echarts-for-react";
import API from "../../services/api";

const Dashboard = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // fallback values so UI never empty
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    categories: 0,
    courses: 0,
    purchased_users: 0,
  });

  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // fetch dashboard data
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("adminside/admin/dashboard-counts/");

      console.log("API DATA:", res.data); 

      setStats({
        users: res.data.users ?? 0,
        vendors: res.data.vendors ?? 0,
        categories: res.data.categories ?? 0,
        courses: res.data.courses ?? 0,
        purchased_users: res.data.purchased_users ?? 0,
      });

    } catch (err) {
      console.error("Dashboard API Error:", err);
    }
  };

  // time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        ":" +
        String(now.getSeconds()).padStart(2, "0");

      const currentDate =
        now.getFullYear() +
        "/" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(now.getDate()).padStart(2, "0") +
        " " +
        WEEK[now.getDay()];

      setTime(currentTime);
      setDate(currentDate);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // bar chart
  const barChartOption = {
    title: { text: "Platform Overview", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Users", "Vendors", "Courses", "Categories", "Purchased"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [
          stats.users,
          stats.vendors,
          stats.courses,
          stats.categories,
          stats.purchased_users,
        ],
        type: "bar",
        itemStyle: { color: "#8b5cf6" },
      },
    ],
  };

  // donut chart
  const donutChartOption = {
    title: { text: "Platform Data", left: "center" },
    tooltip: { trigger: "item" },
    legend: { bottom: "0" },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: [
          { value: stats.users, name: "Users" },
          { value: stats.vendors, name: "Vendors" },
          { value: stats.categories, name: "Categories" },
          { value: stats.courses, name: "Courses" },
          { value: stats.purchased_users, name: "Purchased" },
        ],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="flex justify-start md:items-start items-center mb-2 md:w-[40px] w-[60px]">
        <BackButton />
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">

        {/* Welcome */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-gray-800 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">Hello Admin</h1>
            <p className="text-xl text-green-400">Welcome to Dashboard</p>
          </div>

          <div className="w-full md:w-60 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg p-4">
            <p className="text-2xl text-red-400">{time}</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

          <div className="bg-white p-6 rounded shadow text-center">
            <h3>Users</h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.users || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3>Vendors</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.vendors || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3>Categories</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {stats.categories || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3>Courses</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats.courses || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3>Purchased</h3>
            <p className="text-3xl font-bold text-red-500">
              {stats.purchased_users || 0}
            </p>
          </div>

        </div>

        {/* charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={barChartOption} style={{ height: "300px" }} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={donutChartOption} style={{ height: "300px" }} />
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;