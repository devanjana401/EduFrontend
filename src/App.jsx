import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VendorSignup from './pages/VendorSignup'
import Home from './pages/Home'
import Dashboard from './admin/pages/Dashboard'
import Users from './admin/pages/Users'
import Vendors from './admin/pages/Vendors'
import VendorRequest from './admin/pages/VendorRequest'
import VendorRequests from './admin/pages/VendorRequest'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />
        <Route path="/become-teacher" element={<VendorSignup />} />
                
        {/* admin dashboard */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/vendors" element={<Vendors />} />
        <Route path="/admin/vendor-requests" element={<VendorRequests />}/>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
