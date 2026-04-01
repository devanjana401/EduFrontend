import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/Auth.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const res = await API.post("account/login/", { email, password });

      const { access, role, email: userEmail } = res.data;

      localStorage.setItem("token", access);
      localStorage.setItem("role", role);
      localStorage.setItem("email", userEmail);

      if (role === 1) navigate("/admin");
      else if (role === 2) navigate("/vendor/dashboard");
      else navigate("/");

    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>

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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-link">
          Don't have an account?{" "}
          <span onClick={()=>navigate("/signup")}>Sign up</span>
        </p>

        <p className="auth-link">
          Forgot password?{" "}
          <span onClick={()=>navigate("/reset-password")}>Reset here</span>
        </p>

      </div>

    </div>
  );
};

export default Login;