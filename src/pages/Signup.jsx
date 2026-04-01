import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/Auth.css";

const Signup = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password2,setPassword2] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(password !== password2){
      setError("Passwords do not match");
      return;
    }

    try{

      await API.post("account/signup/",{
        email,
        password,
        role:3
      });

      alert("Account created successfully");

      navigate("/login");

    }catch(err){

      setError(err.response?.data?.error || "Signup failed");

    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h2>Sign Up</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>

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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={password2}
              onChange={(e)=>setPassword2(e.target.value)}
              required
            />
          </div>

          <button type="submit">Sign Up</button>

        </form>

        <p className="auth-link">
          Already have an account?
          <span onClick={()=>navigate("/login")}> Login</span>
        </p>

        <p className="auth-link">
          Enroll as a Teacher?
          <span onClick={()=>navigate("/vendor-signup")}> Signup</span>
        </p>

      </div>

    </div>
  );
};

export default Signup;