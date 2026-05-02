import React, { useEffect, useState } from "react";
import API from "../../services/api";
import VendorLayout from "../components/VendorLayout";
import { useNavigate } from "react-router-dom";

const VendorPurchasedUsers = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await API.get("/vendorside/vendor/purchases/");
      console.log("Purchase Data:", res.data);
      setPurchases(res.data || []);
    } catch (err) {
      console.error("Error fetching vendor purchases", err);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChatNavigate = (item) => {
    // item.user_id is the Student who bought the course
    if (item.course_id && item.user_id) {
      navigate(`/chat/${item.course_id}/${item.user_id}`);
    } else {
      alert("Required IDs missing from the purchase record.");
    }
  };

  return (
    <VendorLayout>
      <div className="p-6 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Purchased Students</h1>

        {loading ? (
          <div className="flex justify-center mt-10">
            <p className="text-gray-500 animate-pulse">Loading students...</p>
          </div>
        ) : purchases.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500">No students have purchased your courses yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">Student Name</th>
                  <th className="p-4 font-semibold text-gray-700">Course</th>
                  <th className="p-4 font-semibold text-gray-700">Purchase Date</th>
                  <th className="p-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                    {/* Displaying User Name */}
                    <td className="p-4 font-medium text-gray-900">{item.user}</td>
                    
                    {/* Displaying Course Name */}
                    <td className="p-4 text-gray-700">{item.course}</td>
                    
                    <td className="p-4 text-gray-500">
                      {item.date ? new Date(item.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : "N/A"}
                    </td>
                    
                    <td className="p-4">
                      <button 
                        onClick={() => handleChatNavigate(item)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm font-medium transition shadow-sm"
                      >
                        <span role="img" aria-label="chat">💬</span>
                        Chat with Student
                      </button>
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