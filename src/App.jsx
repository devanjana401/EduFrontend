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
import Users from './admin/pages/Users'
import Vendors from './admin/pages/Vendors'
import VendorRequests from './admin/pages/VendorRequest'
import ScreenButton from './components/ScreenButton'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import Contact from './pages/Contact'

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

      </Routes>

      <Footer/>
      <ScreenButton/>
    </>
  )
}

export default App