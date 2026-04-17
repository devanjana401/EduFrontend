import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import API from "../../../services/api";

const CourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`vendorside/course/${id}/`);
      setCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Course Details</h2>

        <div className="border p-4 rounded space-y-3">
          <h3 className="text-xl font-semibold">{course.coursename}</h3>

          <p><b>Category:</b> {course.category}</p>
          <p><b>Vendor:</b> {course.vendor}</p>
          <p><b>Price:</b> ₹ {course.price}</p>

          <p><b>Headline:</b> {course.headline}</p>
          <p><b>Description:</b> {course.description}</p>
          <p><b>About:</b> {course.about}</p>

          {course.coverphoto && (
            <img
              src={course.coverphoto}
              alt="cover"
              className="w-64 mt-4"
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CourseView;