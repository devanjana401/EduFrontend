import React, { useEffect, useState } from "react";
import API from "../../services/api";
import VendorLayout from "../components/VendorLayout";

const VendorPurchasedUsers = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await API.get("/vendorside/vendor/purchases/");
      setPurchases(res.data || []);
    } catch (err) {
      console.error("Error fetching vendor purchases", err);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VendorLayout>
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Purchased Students</h1>

      {loading ? (
        <p>Loading...</p>
      ) : purchases.length === 0 ? (
        <p>No students purchased your courses</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Course</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {purchases.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.user}</td>
                  <td className="p-3">{item.course}</td>
                  <td className="p-3">
                    {new Date(item.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </VendorLayout>
  );
};

export default VendorPurchasedUsers;