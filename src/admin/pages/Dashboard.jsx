import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";

const Dashboard = () => {

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [stats] = useState({
    users: 120,
    vendors: 45,
    requests: 8,
    revenue: 5000
  });

  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

      <div className="p-6 bg-gray-100 min-h-screen">

        {/* Welcome Section */}

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

        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

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

      </div>

    </AdminLayout>
  );
};

export default Dashboard; 