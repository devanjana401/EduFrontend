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
import VendorRequests from './admin/pages/vendorRequest/VendorRequest'
import ScreenButton from './components/ScreenButton'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import VendorDashboard from './vendor/pages/VendorDashboard'
import VendorProfileView from './admin/pages/vendors/VendorProfileView'
import VendorProfileEdit from './admin/pages/vendors/VendorProfileEdit'
import VendorRequest from './admin/pages/vendorRequest/VendorRequest'
import VendorRequestView from './admin/pages/vendorRequest/VendorRequestView'
import VendorRequestEdit from './admin/pages/vendorRequest/VendorRequestEdit'

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

        {/* Users actions*/}
        <Route path="/admin/users" element={<Users />} />


        {/* vendors actions*/}
        <Route path="/admin/vendors" element={<Vendors />} />
        <Route path="/admin/vendor/:id" element={<VendorProfileView />} />
        <Route path="/admin/vendor-update/:id" element={<VendorProfileEdit />} />

        {/* vendor request actions*/}
        <Route path="/admin/vendor-requests" element={<VendorRequest />} />
        <Route path="/admin/vendor-request-view/:id" element={<VendorRequestView />} />
        <Route path="/admin/vendor-request-update/:id" element={<VendorRequestEdit />} />


        {/* vendor routes */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />

      </Routes>

      <Footer/>
      <ScreenButton/>
    </>
  )
}

export default App