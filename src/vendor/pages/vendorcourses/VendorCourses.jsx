import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const VendorCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/vendorside/vendor-courses/");
      setCourses(res.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // actions
  const handleView = (id) => {
    navigate(`/vendor/course/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/vendor/course/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this course?")) {
      try {
        await API.delete(`/vendorside/course-delete/${id}/`);
        alert("Course deleted successfully");
        fetchCourses();
      } catch (error) {
        console.log(error.response?.data || error);
      }
    }
  };

  return (
    <VendorLayout>
      <div className="p-8 bg-gray-50 min-h-screen">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          My Courses
        </h2>

        {courses.length === 0 && (
          <div className="text-center mt-20 text-gray-500 text-lg">
            No courses created yet
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {courses.map((course) => (

            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >

              {/* image click view */}
              <div
                className="relative cursor-pointer"
                onClick={() => handleView(course.id)}
              >
                <img
                  src={
                    course.coverphoto
                      ? `http://localhost:8000${course.coverphoto}`
                      : "/default.png"
                  }
                  alt=""
                  className="h-44 w-full object-cover group-hover:scale-105 transition"
                />

                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  ₹{course.price}
                </div>
              </div>

              <div className="p-4">

                <h3 className="font-semibold text-lg text-gray-800">
                  {course.coursename}
                </h3>

                {/* status */}
                <div className="mt-2">
                  {course.publishadmin ? (
                    <span className="text-green-600 text-sm font-semibold">
                      Approved
                    </span>
                  ) : course.is_requested ? (
                    <span className="text-yellow-600 text-sm font-semibold">
                      Pending Approval
                    </span>
                  ) : (
                    <span className="text-red-500 text-sm font-semibold">
                      Draft
                    </span>
                  )}
                </div>

                {/* action buttons */}
                <div className="flex justify-center gap-5 mt-4 text-lg">

                  <FaEye
                    className="cursor-pointer text-black hover:text-gray-700 transition"
                    onClick={() => handleView(course.id)}
                  />

                  <FaEdit
                    className="cursor-pointer text-black hover:text-gray-700 transition"
                    onClick={() => handleEdit(course.id)}
                  />

                  <FaTrash
                    className="cursor-pointer text-black hover:text-red-600 transition"
                    onClick={() => handleDelete(course.id)}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </VendorLayout>
  );
};

export default VendorCourses;