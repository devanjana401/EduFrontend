import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("userside/public-courses/");
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>All Courses</h2>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.coursename}</h3>
          <p>₹ {course.price}</p>

          <button onClick={() => navigate(`/course/${course.id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserCourses;