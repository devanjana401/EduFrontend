import React, { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../components/AdminLayout";

const AdminPurchasedUsers = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await API.get("/adminside/admin/purchases/");

      console.log("API Response:", res.data); // 👈 DEBUG

      // handle all possible response formats
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || res.data.results || [];

      setPurchases(data);

    } catch (err) {
      console.error("Error fetching purchases", err);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Purchased Users</h1>

      {loading ? (
        <p>Loading...</p>
      ) : !Array.isArray(purchases) || purchases.length === 0 ? (
        <p>No purchases found</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Course</th>
                <th className="p-3">Vendor</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {purchases.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.user}</td>
                  <td className="p-3">{item.course}</td>
                  <td className="p-3">{item.vendor}</td>
                  <td className="p-3">
                    {item.date
                      ? new Date(item.date).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminPurchasedUsers;