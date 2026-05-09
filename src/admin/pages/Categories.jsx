import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../../services/api";
import BackButton from "../../components/BackButton";
import Popup from "../../components/Popup";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ categoryname: "", description: "", image: null });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    const res = await API.get("/vendorside/categories/");
    setCategories(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(k => formData.append(k, form[k]));
    try {
      await API.post("/adminside/create-category/", formData);
      showPopup("Category created successfully", "success");
      setForm({ categoryname: "", description: "", image: null });
      e.target.reset(); // clear file input
      fetchCategories();
    } catch (err) {
      showPopup(err.response?.data?.error || "Error creating category", "error");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-start md:items-start items-center mb-2 md:w-[40px] w-[60px] ">
        <BackButton/>
      </div>
      <div className="p-4 md:p-8">
        
        <Popup
          message={popupMessage}
          type={popupType}
          isOpen={popupOpen}
          onClose={closePopup}
          autoClose={3000}
        />

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">Add New Category</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <input type="text" name="categoryname" placeholder="Category Name" className="border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" className="border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} required />
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 block">Category Image</label>
              <input type="file" name="image" className="border border-slate-200 p-2.5 rounded-xl w-full bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} required />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg md:col-span-2 transition-all hover:-translate-y-0.5 mt-2">Create Category</button>
          </form>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Categories</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold text-sm">ID</th>
                  <th className="p-4 font-semibold text-sm">Name</th>
                  <th className="p-4 font-semibold text-sm">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-slate-500 font-medium">{cat.id}</td>
                    <td className="p-4 font-semibold text-slate-800">{cat.categoryname}</td>
                    <td className="p-4 text-slate-600">{cat.description}</td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-slate-500">No categories found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;