import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import UserCourses from "../user/pages/UserCourses";
import CourseDetail from "../user/pages/CourseDetail";
import MyCourses from "../user/pages/MyCourses";
import VideoPlayer from "../user/pages/VideoPlayer";

const UserRoutes = () => {
  return (
    <>
      <Route path="/courses" element={<UserCourses />} />
      <Route path="/course/:id" element={<CourseDetail />} />

      <Route path="/my-courses" element={
        <ProtectedRoute allowedRole={3}>
          <MyCourses />
        </ProtectedRoute>
      } />

      <Route path="/watch/:id" element={
        <ProtectedRoute allowedRole={3}>
          <VideoPlayer />
        </ProtectedRoute>
      } />
    </>
  );
};

export default UserRoutes;