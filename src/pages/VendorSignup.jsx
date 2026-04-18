import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Popup from "../components/Popup";
import "../css/Auth.css";

const VendorSignup = () => {

  const [formData,setFormData] = useState({
    full_name:"",
    email:"",
    phone:"",
    bio:"",
    experience_years:"",
    specialization:""
  });

  const [certificate,setCertificate] = useState(null);
  const [idProof,setIdProof] = useState(null);
  const [loading,setLoading] = useState(false);
  
  // popup states
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleFileChange = (e,type)=>{
    if(type==="certificate") setCertificate(e.target.files[0]);
    if(type==="id_proof") setIdProof(e.target.files[0]);
  };

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach(key=>{
      data.append(key,formData[key]);
    });

    if(certificate) data.append("certificate",certificate);
    if(idProof) data.append("id_proof",idProof);

    try{

      await API.post("account/vendor-request/",data,{
        headers:{ "Content-Type":"multipart/form-data" }
      });

      showPopup("Request submitted successfully! Redirecting to login...", "success");

      setTimeout(()=>{
        navigate("/login");
      },3000);

    }catch(err){

      showPopup(err.response?.data?.message || "Failed to submit request. Please try again.", "error");
      console.log(err);

    }finally{

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="vendor-box">

        <h2>Become a Teacher</h2>

        <Popup 
          message={popupMessage}
          type={popupType}
          isOpen={popupOpen}
          onClose={closePopup}
          autoClose={3000}
        />

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience_years"
              value={formData.experience_years}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Certificate</label>
            <input
              type="file"
              onChange={(e)=>handleFileChange(e,"certificate")}
            />
          </div>

          <div className="form-group">
            <label>ID Proof</label>
            <input
              type="file"
              onChange={(e)=>handleFileChange(e,"id_proof")}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default VendorSignup;