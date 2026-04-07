import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../../services/api";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(k => formData.append(k, form[k]));
    await API.post("/adminside/create-category/", formData);
    fetchCategories();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mb-10">
          <input type="text" name="categoryname" placeholder="Category Name" className="border p-3 rounded" onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" className="border p-3 rounded" onChange={handleChange} />
          <input type="file" name="image" className="border p-3 rounded md:col-span-2" onChange={handleChange} />
          <button className="bg-blue-600 text-white p-3 rounded md:col-span-2">Create Category</button>
        </form>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Description</th></tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.id}</td>
                <td className="p-3">{cat.categoryname}</td>
                <td className="p-3">{cat.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Categories;