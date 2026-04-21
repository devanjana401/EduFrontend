import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../admin/pages/Dashboard";
import Categories from "../admin/pages/Categories";
import Users from "../admin/pages/users/Users";
import Vendors from "../admin/pages/vendors/Vendors";
import VendorRequests from "../admin/pages/vendorRequest/VendorRequest";
import VendorProfileView from "../admin/pages/vendors/VendorProfileView";
import VendorProfileEdit from "../admin/pages/vendors/VendorProfileEdit";
import VendorRequestView from "../admin/pages/vendorRequest/VendorRequestView";
import VendorRequestEdit from "../admin/pages/vendorRequest/VendorRequestEdit";
import Courses from "../admin/pages/courses/Courses";
import ApprovedCourses from "../admin/pages/courses/ApprovedCourses";
import CourseView from "../admin/pages/courses/CourseView";
import CourseEdit from "../admin/pages/courses/CourseEdit";
import AdminPurchasedUsers from "../admin/pages/AdminPurchasedUsers";

const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin" element={<ProtectedRoute allowedRole={1}><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute allowedRole={1}><Courses /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRole={1}><Users /></ProtectedRoute>} />
      <Route path="/admin/vendors" element={<ProtectedRoute allowedRole={1}><Vendors /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute allowedRole={1}><Categories /></ProtectedRoute>} />
      <Route path="/admin/vendor-requests" element={<ProtectedRoute allowedRole={1}><VendorRequests /></ProtectedRoute>} />
      <Route path="/admin/vendor/:id" element={<ProtectedRoute allowedRole={1}><VendorProfileView /></ProtectedRoute>} />
      <Route path="/admin/vendor-update/:id" element={<ProtectedRoute allowedRole={1}><VendorProfileEdit /></ProtectedRoute>} />
      <Route path="/admin/vendor-request-view/:id" element={<ProtectedRoute allowedRole={1}><VendorRequestView /></ProtectedRoute>} />
      <Route path="/admin/vendor-request-update/:id" element={<ProtectedRoute allowedRole={1}><VendorRequestEdit /></ProtectedRoute>} />
      <Route path="/admin/approved-courses" element={<ProtectedRoute allowedRole={1}><ApprovedCourses /></ProtectedRoute>} />
      <Route path="/admin/course-view/:id" element={<CourseView />} />
      <Route path="/admin/course-edit/:id" element={<CourseEdit />} />

      <Route path="/admin/purchases" element={<AdminPurchasedUsers />} />
    </>
  );
};

export default AdminRoutes;