import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

const ResetPassword = () => {

  const [email,setEmail] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e)=>{
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try{

      const res = await API.post("account/reset-password/",{
        email,
        new_password:newPassword
      });

      setMessage(res.data.message);

      setTimeout(()=>{
        navigate("/login");
      },2000);

    }catch(err){

      setError(err.response?.data?.error || "Something went wrong");

    }finally{

      setLoading(false);

    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h2>Reset Password</h2>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <form onSubmit={handleReset}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;