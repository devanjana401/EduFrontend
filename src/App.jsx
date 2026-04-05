import { Route, Routes } from 'react-router-dom'
import './App.css'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Signup from './pages/Signup'
import VendorSignup from './pages/VendorSignup'
import Home from './pages/Home'

import Dashboard from './admin/pages/Dashboard'
import Users from './admin/pages/users/Users'
import Vendors from './admin/pages/vendors/Vendors'
import VendorRequests from './admin/pages/vendors/VendorRequest'
import ScreenButton from './components/ScreenButton'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import VendorDashboard from './vendor/pages/VendorDashboard'
import VendorProfileView from './admin/pages/vendors/VendorProfileView'
import VendorProfileEdit from './admin/pages/vendors/VendorProfileEdit'
import UserProfileEdit from './admin/pages/users/UserProfileEdit'
import UserProfileView from './admin/pages/users/UserProfileView'

function App() {

  return (
    <>
      <Navbar/>

      <Routes>

        {/* public routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />


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
          path="/admin/vendor-requests"
          element={
            <ProtectedRoute allowedRole={1}>
              <VendorRequests />
            </ProtectedRoute>
          }
        />

        {/* View vendor */}
        {/* <Route path="/admin/profile-view/user/:id" element={<UserProfileView />} /> */}
        {/* edit vendor */}
        {/* <Route path="/admin/profile-edit/user/:id" element={<UserProfileEdit />} /> */}
      
        {/* View vendor */}
        <Route path="/admin/profile-view/vendor/:id" element={<VendorProfileView />} />
        {/* edit vendor */}
        <Route path="/admin/profile-edit/vendor/:id" element={<VendorProfileEdit />} />


        {/* vendor routes */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />

      </Routes>

      <Footer/>
      <ScreenButton/>
    </>
  )
}

export default App