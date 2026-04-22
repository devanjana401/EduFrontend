import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import BackButton from "../../components/BackButton";
// import eCharts
import ReactECharts from "echarts-for-react";

const Dashboard = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [stats] = useState({
    users: 120,
    vendors: 45,
    requests: 8,
    revenue: 5000,
  });

  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // chart configurations

  // 1-bar chart option 
  const barChartOption = {
    title: { text: "Monthly Revenue", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [1200, 1900, 1500, 2500, 3200, 5000],
        type: "bar",
        itemStyle: { color: "#8b5cf6" }, // Purple
      },
    ],
  };

  // 2-donut chart option (user/vendor distribution)
  const donutChartOption = {
    title: { text: "Platform Split", left: "center" },
    tooltip: { trigger: "item" },
    legend: { bottom: "0" },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"], // this creates the "Donut" hole
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false },
        data: [
          { value: 120, name: "Users", itemStyle: { color: "#3b82f6" } },
          { value: 45, name: "Vendors", itemStyle: { color: "#10b981" } },
          { value: 8, name: "Pending", itemStyle: { color: "#f97316" } },
        ],
      },
    ],
  };

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

  return (
    <AdminLayout>
      <div className="flex justify-start md:items-start items-center mb-2 md:w-[40px] w-[60px] ">
        <BackButton />
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        {/* welcome section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-gray-800 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">Hello Admin</h1>
            <p className="text-xl text-green-400">Welcome to Dashboard</p>
            <p className="mt-2">Manage users, vendors and platform data.</p>
          </div>

          <div className="w-full md:w-60 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg p-4">
            <p className="text-2xl text-red-400">{time}</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>

        {/* statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Total Vendors</h3>
            <p className="text-3xl font-bold text-green-600">{stats.vendors}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Vendor Requests</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.requests}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-gray-500">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">${stats.revenue}</p>
          </div>
        </div>

        {/* charts section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* bar chart card */}
          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={barChartOption} style={{ height: "300px" }} />
          </div>

          {/* donut chart card */}
          <div className="bg-white p-4 rounded shadow">
            <ReactECharts option={donutChartOption} style={{ height: "300px" }} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;