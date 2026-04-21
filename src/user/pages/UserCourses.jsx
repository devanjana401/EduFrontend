import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle, FaRupeeSign } from "react-icons/fa";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]); // purchased ids
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allRes, myRes] = await Promise.all([
        API.get("userside/public-courses/"),
        API.get("userside/my-courses/")
      ]);

      setCourses(allRes.data);
      setMyCourses(myRes.data.map(c => c.id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isPurchased = (courseId) => {
    return myCourses.includes(courseId);
  };

  return (  
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative">

      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-900 to-slate-50 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-14 text-white">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Available Courses
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Discover courses designed to build real-world skills and advance your career.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center border border-slate-100">
            <h3 className="text-lg text-slate-500">
              No courses available at the moment.
            </h3>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {courses.map((course) => {
              const purchased = isPurchased(course.id);

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >

                  {/* image */}
                  <div className="h-44 overflow-hidden relative bg-slate-200">
                    {course.coverphoto ? (
                      <img
                        src={`http://127.0.0.1:8000${course.coverphoto}`}
                        alt={course.coursename}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400">
                        No Image
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaPlayCircle className="text-white/70 text-5xl opacity-0 group-hover:opacity-100 transition duration-300" />
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-6 flex flex-col flex-grow">

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.coursename}
                    </h3>

                    <p className="text-sm text-slate-500 mb-6 line-clamp-3 flex-grow">
                      {course.description}
                    </p>

                    {/* footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">

                      <div className="flex items-center text-lg font-semibold text-slate-900">
                        <FaRupeeSign className="text-sm text-slate-500 mr-1" />
                        {course.price}
                      </div>

                      {purchased ? (
                        <button
                          onClick={() => navigate("/course/my-courses")}
                          className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                        >
                          Watch Course
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                        >
                          View Details
                        </button>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default UserCourses;