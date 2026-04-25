import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaRupeeSign } from "react-icons/fa";

const CourseDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate(); 

  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchVideos();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await API.get("userside/public-courses/");
      const found = res.data.find((c) => c.id == id);
      setCourse(found);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await API.get(`userside/course-videos/${id}/`);
      setVideos(res.data);
      setIsPurchased(true);
    } catch {
      const res = await API.get(`userside/preview-videos/${id}/`);
      setVideos(res.data);
      setIsPurchased(false);
    }
  };

  const handleBuy = async () => {
    try {
      await API.post(`userside/buy/${id}/`);
      alert("Purchased Successfully");

      // redirect after purchase
      navigate("/courses");   

    } catch (error) {
      alert("Error purchasing",error);
    }
  };

  if (!course) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {course.coursename}
          </h2>
          <p className="text-gray-500 text-sm mt-1 max-w-lg">
            {course.description}
          </p>
        </div>

        <div className="flex flex-col md:items-end">

          <p className="text-lg font-semibold flex items-center">
            <FaRupeeSign className="mr-1" />
            {course.price}
          </p>

          {!isPurchased ? (
            <button
              onClick={handleBuy}
              className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          ) : (
            <p className="text-green-600 text-sm mt-2 font-medium">
              Purchased
            </p>
          )}

        </div>

      </div>

      {/* video */}
      {videos.length === 0 ? (
        <p className="text-gray-500 text-sm">
          {isPurchased
            ? "No videos available"
            : "Purchase to unlock videos"}
        </p>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >

              {/* video-lock */}
              <div className="relative h-32">

                {isPurchased ? (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    src={`http://127.0.0.1:8000${video.video}`}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FaLock className="text-xl text-gray-500" />
                  </div>
                )}

              </div>

              {/* content */}
              <div className="p-2">

                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                  {video.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {video.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      )}

    </div>
  );
};

export default CourseDetail;


























// import React, { useEffect, useState } from "react";
// import API from "../../services/api";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaLock, FaRupeeSign } from "react-icons/fa";

// const CourseDetail = () => {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [videos, setVideos] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [isPurchased, setIsPurchased] = useState(false);

//   useEffect(() => {
//     fetchCourse();
//     fetchVideos();
//   }, [id]);

//   const fetchCourse = async () => {
//     try {
//       const res = await API.get("userside/public-courses/");
//       const found = res.data.find((c) => c.id == id);
//       setCourse(found);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchVideos = async () => {
//     try {
//       const res = await API.get(`userside/video/${id}/`);
//       setVideos(res.data);
//       setIsPurchased(true);
//     } catch {
//       const res = await API.get(`userside/preview-videos/${id}/`);
//       setVideos(res.data);
//       setIsPurchased(false);
//     }
//   };

//   const handleBuy = async () => {
//     try {
//       // 1Call backend to create order
//       const res = await API.post(`userside/buy/${id}/`);

//       const { order_id, amount, key } = res.data;

//       // razorpay options 
//       const options = {
//         key: key,
//         amount: amount,
//         currency: "INR",
//         order_id: order_id,

//         method: {
//           upi: true  //this for enable upi option
//         },

//         handler: async function (response) {
//           // verify payment
//           await API.post(`userside/verify-payment/${id}/`, response);

//           alert("Payment Successful ✅");

//           navigate("/course/my-courses");
//         }
//       };

//       // razorpay popup
//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (error) {
//       console.log(error);
//       alert("Payment failed ❌");
//     }
//   };

//   if (!course) return <p className="p-8">Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">

//       <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {course.coursename}
//           </h2>
//           <p className="text-gray-500 text-sm mt-1 max-w-lg">
//             {course.description}
//           </p>
//         </div>

//         <div className="flex flex-col md:items-end">

//           <p className="text-lg font-semibold flex items-center">
//             <FaRupeeSign className="mr-1" />
//             {course.price}
//           </p>

//           {!isPurchased ? (
//             <button
//               onClick={handleBuy}
//               className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition"
//             >
//               Buy Now
//             </button>
//           ) : (
//             <p className="text-green-600 text-sm mt-2 font-medium">
//               Purchased
//             </p>
//           )}

//         </div>

//       </div>

//       {/* video */}
//       {videos.length === 0 ? (
//         <p className="text-gray-500 text-sm">
//           {isPurchased
//             ? "No videos available"
//             : "Purchase to unlock videos"}
//         </p>
//       ) : (

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

//           {videos.map((video) => (
//             <div
//               key={video.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
//             >

//               {/* video-lock */}
//               <div className="relative h-32">

//                 {isPurchased ? (
//                   <video
//                     controls
//                     className="w-full h-full object-cover"
//                     src={`http://127.0.0.1:8000${video.video}`}
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                     <FaLock className="text-xl text-gray-500" />
//                   </div>
//                 )}

//               </div>

//               {/* content */}
//               <div className="p-2">

//                 <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
//                   {video.title}
//                 </h3>

//                 <p className="text-xs text-gray-500 line-clamp-2 mt-1">
//                   {video.description}
//                 </p>

//               </div>

//             </div>
//           ))}

//         </div>

//       )}

//     </div>
//   );
// };

// export default CourseDetail;