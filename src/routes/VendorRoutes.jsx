import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import VendorDashboard from "../vendor/pages/VendorDashboard";
import VendorCourses from "../vendor/pages/vendorcourses/VendorCourses";
import VendorCreateCourse from "../vendor/pages/vendorcourses/VendorCreateCourse";
import VendorVideos from "../vendor/pages/vendorvideos/VendorVideos";
import VendorUploadVideo from "../vendor/pages/vendorvideos/VendorUploadVideo";
import ViewVideo from "../vendor/pages/vendorvideos/ViewVideo";
import EditVideo from "../vendor/pages/vendorvideos/EditVideo";

const VendorRoutes = () => {
  return (
    <>
      <Route path="/vendor" element={<ProtectedRoute allowedRole={2}><VendorDashboard /></ProtectedRoute>} />
      <Route path="/vendor/courses" element={<ProtectedRoute allowedRole={2}><VendorCourses /></ProtectedRoute>} />
      <Route path="/vendor/create-course" element={<ProtectedRoute allowedRole={2}><VendorCreateCourse /></ProtectedRoute>} />
      <Route path="/vendor/course/:id" element={<ProtectedRoute allowedRole={2}><VendorVideos /></ProtectedRoute>} />
      <Route path="/vendor/course/:id/upload-video" element={<ProtectedRoute allowedRole={2}><VendorUploadVideo /></ProtectedRoute>} />
      <Route path="/vendor/video/:id" element={<ViewVideo />} />
      <Route path="/vendor/video/edit/:id" element={<EditVideo />} />
    </>
  );
};

export default VendorRoutes;