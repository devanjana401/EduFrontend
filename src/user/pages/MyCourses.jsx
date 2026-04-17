import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      const res = await API.get("userside/my-courses/");
      setCourses(res.data);
    };
    fetchMyCourses();
  }, []);

  return (
    <div>
      <h2>My Courses</h2>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.coursename}</h3>

          <button onClick={() => navigate(`/watch/${course.id}`)}>
            Watch
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;