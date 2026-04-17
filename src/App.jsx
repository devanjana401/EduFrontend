import { Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ScreenButton from "./components/ScreenButton";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VendorSignup from "./pages/VendorSignup";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Dashboard from "./admin/pages/Dashboard";
import Categories from "./admin/pages/Categories";
import Users from "./admin/pages/users/Users";
import Vendors from "./admin/pages/vendors/Vendors";
import VendorRequests from "./admin/pages/vendorRequest/VendorRequest";
import VendorProfileView from "./admin/pages/vendors/VendorProfileView";
import VendorProfileEdit from "./admin/pages/vendors/VendorProfileEdit";
import VendorRequestView from "./admin/pages/vendorRequest/VendorRequestView";
import VendorRequestEdit from "./admin/pages/vendorRequest/VendorRequestEdit";
import Courses from "./admin/pages/courses/Courses";

import VendorDashboard from "./vendor/pages/VendorDashboard";
import VendorCreateCourse from "./vendor/pages/vendorcourses/VendorCreateCourse";
import VendorCourses from "./vendor/pages/vendorcourses/VendorCourses";
import VendorUploadVideo from "./vendor/pages/vendorvideos/VendorUploadVideo";
import VendorVideos from "./vendor/pages/vendorvideos/VendorVideos";

import UserCourses from "./user/pages/UserCourses";
import CourseDetail from "./user/pages/CourseDetail";
import MyCourses from "./user/pages/MyCourses";
import VideoPlayer from "./user/pages/VideoPlayer";
import ApprovedCourses from "./admin/pages/courses/ApprovedCourses";
import CourseView from "./admin/pages/courses/CourseView";
import CourseEdit from "./admin/pages/courses/CourseEdit";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />


        {/* user routes */}

        {/* all courses */}
        <Route path="/courses" element={<UserCourses />} />
        {/* single course detail */}
        <Route path="/course/:id" element={<CourseDetail />} />
        {/* my purchased courses */}
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute allowedRole={3}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        {/* watch videos */}
        <Route
          path="/watch/:id"
          element={
            <ProtectedRoute allowedRole={3}>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />


        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole={1}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRole={1}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole={1}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendors"
          element={
            <ProtectedRoute allowedRole={1}>
              <Vendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRole={1}>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendor-requests"
          element={
            <ProtectedRoute allowedRole={1}>
              <VendorRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendor/:id"
          element={
            <ProtectedRoute allowedRole={1}>
              <VendorProfileView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendor-update/:id"
          element={
            <ProtectedRoute allowedRole={1}>
              <VendorProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendor-request-view/:id"
          element={
            <ProtectedRoute allowedRole={1}>
              <VendorRequestView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendor-request-update/:id"
          element={
            <ProtectedRoute allowedRole={1}>
              <VendorRequestEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/approved-courses"
          element={
            <ProtectedRoute allowedRole={1}>
              <ApprovedCourses />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/course-view/:id" element={<CourseView />} />
        <Route path="/admin/course-edit/:id" element={<CourseEdit />} />

        {/* vendor routes */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute allowedRole={2}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/courses"
          element={
            <ProtectedRoute allowedRole={2}>
              <VendorCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/create-course"
          element={
            <ProtectedRoute allowedRole={2}>
              <VendorCreateCourse />
            </ProtectedRoute>
          }
        />
        {/* course videos */}
        <Route
          path="/vendor/course/:id"
          element={
            <ProtectedRoute allowedRole={2}>
              <VendorVideos />
            </ProtectedRoute>
          }
        />
        {/* upload video */}
        <Route
          path="/vendor/course/:id/upload-video"
          element={
            <ProtectedRoute allowedRole={2}>
              <VendorUploadVideo />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
      <ScreenButton />
    </>
  );
}

export default App;