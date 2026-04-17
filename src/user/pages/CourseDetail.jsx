import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get("userside/public-courses/");
      const found = res.data.find((c) => c.id == id);
      setCourse(found);
    };
    fetchCourse();
  }, [id]);

  const handleBuy = async () => {
    try {
      await API.post(`userside/buy/${id}/`);
      alert("Purchased Successfully");
      navigate("/my-courses");
    } catch (err) {
      alert("Error purchasing",err);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.coursename}</h2>
      <p>{course.description}</p>
      <p>₹ {course.price}</p>

      <button onClick={handleBuy}>Buy Now</button>
    </div>
  );
};

export default CourseDetail;