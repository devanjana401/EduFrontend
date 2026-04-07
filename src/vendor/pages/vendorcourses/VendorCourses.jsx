import React, { useEffect, useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import API from "../../../services/api";

const VendorCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/vendorside/vendor-courses/");
        console.log("Vendor courses:", res.data);
        setCourses(res.data);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <VendorLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Courses</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-4 shadow rounded">
              <img
                src={course.coverphoto ? `http://localhost:8000${course.coverphoto}` : "/default.png"}
                alt=""
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-3">{course.coursename}</h3>
              <p className="text-gray-500">₹{course.price}</p>
            </div>
          ))}
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorCourses;