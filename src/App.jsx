import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VendorSignup from './pages/VendorSignup'
import Home from './pages/Home'

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
      </Routes>
      <Footer/>
    </>
  )
}

export default App
