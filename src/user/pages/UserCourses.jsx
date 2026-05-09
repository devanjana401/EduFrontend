import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlayCircle, FaRupeeSign, FaSearch, FaFilter } from "react-icons/fa";
import Breadcrumbs from "../../components/Breadcrumbs";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [myCourses, setMyCourses] = useState([]); // purchased ids
  const [loading, setLoading] = useState(true);

  // filters state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allRes, myRes, catRes] = await Promise.all([
        API.get("userside/public-courses/"),
        API.get("userside/my-courses/"),
        API.get("vendorside/categories/") // fetch categories for the filter
      ]);

      setCourses(allRes.data);
      setFilteredCourses(allRes.data);
      setMyCourses(myRes.data.map(c => c.id));
      setCategories(catRes.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // apply filters locally whenever courses or filter states change
    let result = [...courses];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        c => c.coursename.toLowerCase().includes(lowerQuery) || 
             (c.description && c.description.toLowerCase().includes(lowerQuery))
      );
    }

    if (selectedCategory) {
      // assuming course.category returns category ID
      result = result.filter(c => c.category?.toString() === selectedCategory.toString());
    }

    if (priceSort === "low-to-high") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (priceSort === "high-to-low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredCourses(result);
  }, [courses, searchQuery, selectedCategory, priceSort]);

  // sync state if URL query param changes directly
  useEffect(() => {
    const querySearch = new URLSearchParams(location.search).get("search");
    if (querySearch !== null && querySearch !== searchQuery) {
      setSearchQuery(querySearch);
    }
  }, [location.search]);

  const isPurchased = (courseId) => {
    return myCourses.includes(courseId);
  };

  return (  
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative">

      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-blue-900 to-slate-50 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 inline-block mb-4 border border-white/40 shadow-sm">
          <Breadcrumbs />
        </div>

        <div className="text-center mb-10 text-white">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Available Courses
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Discover courses designed to build real-world skills and advance your career.
          </p>
        </div>

        {/* filters section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search in courses..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // update URL to match search query
                if (e.target.value) {
                  navigate(`/courses?search=${encodeURIComponent(e.target.value)}`, { replace: true });
                } else {
                  navigate(`/courses`, { replace: true });
                }
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-48 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.categoryname}</option>
                ))}
              </select>
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <select 
              value={priceSort} 
              onChange={(e) => setPriceSort(e.target.value)}
              className="w-full sm:w-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
            >
              <option value="">Sort by Price</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-slate-100 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-blue-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No courses found</h3>
            <p className="text-slate-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            {(searchQuery || selectedCategory || priceSort) && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setPriceSort("");
                  navigate("/courses");
                }}
                className="mt-6 text-blue-600 font-semibold hover:text-blue-800"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {filteredCourses.map((course) => {
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
                        src={`https://educonnectapi.anjanasasi.online${course.coverphoto}`}
                        alt={course.coursename}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400">
                        No Image
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaPlayCircle className="text-white/90 text-5xl transform scale-75 group-hover:scale-100 transition duration-300" />
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
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">

                      <div className="flex items-center text-lg font-bold text-slate-900">
                        {Number(course.price) === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <>
                            <FaRupeeSign className="text-sm text-slate-500 mr-1" />
                            {course.price}
                          </>
                        )}
                      </div>

                      {purchased ? (
                        <button
                          onClick={() => navigate("/course/my-courses")}
                          className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all shadow-sm hover:shadow-md"
                        >
                          Watch Course
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
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