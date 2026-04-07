import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../../services/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    const res = await API.get("/adminside/pending-courses/");
    setCourses(res.data);
  };

  const approveCourse = async (id) => {
    await API.patch(`/adminside/approve-course/${id}/`);
    fetchCourses();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Pending Courses</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr><th className="p-3">Course</th><th className="p-3">Vendor</th><th className="p-3">Price</th><th className="p-3">Action</th></tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-t">
                <td className="p-3">{course.coursename}</td>
                <td className="p-3">{course.vendor}</td>
                <td className="p-3">₹{course.price}</td>
                <td className="p-3">
                  <button onClick={() => approveCourse(course.id)} className="bg-green-600 text-white px-4 py-2 rounded">
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Courses;