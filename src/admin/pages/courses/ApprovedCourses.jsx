import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import BackButton from "../../../components/BackButton";

const ApprovedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("vendorside/approved-courses/");
      setCourses(res.data);
    } catch (err) {
      console.log("Error fetching approved courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await API.delete(`vendorside/course/delete/${id}/`);
      alert("Deleted");
      fetchCourses();
    } catch {
      alert("Delete failed");
    }
  };

  const viewCourse = (id) => {
    navigate(`/admin/course-view/${id}`);
  };

  const editCourse = (id) => {
    navigate(`/admin/course-edit/${id}`);
  };

  return (
    <AdminLayout>
      <div className="flex justify-start md:items-start items-center mb-2 md:w-[40px] w-[60px] ">
        <BackButton/>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Approved Courses</h2>

        {loading ? (
          <p>Loading...</p>
        ) : courses.length === 0 ? (
          <p>No approved courses</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr className="text-center">
                <th className="p-3">Course</th>
                <th className="p-3">Vendor</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-t text-center">
                  <td className="p-3">{course.coursename}</td>
                  <td className="p-3">{course.vendor}</td>
                  <td className="p-3">₹ {course.price}</td>

                  <td className="p-3">
                    <div className="flex justify-center gap-4 text-lg">

                      <FaEye
                        className="cursor-pointer hover:scale-110"
                        title="View"
                        onClick={() => viewCourse(course.id)}
                      />

                      <FaEdit
                        className="cursor-pointer hover:scale-110"
                        title="Edit"
                        onClick={() => editCourse(course.id)}
                      />

                      <FaTrash
                        className="cursor-pointer hover:scale-110"
                        title="Delete"
                        onClick={() => deleteCourse(course.id)}
                      />

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default ApprovedCourses;