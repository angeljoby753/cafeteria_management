import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import logo from "../assets/caffino-logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        alert("Login successful!");
        navigate("/");
      }
    } catch (err) {
      const serverError = err.response?.data;
      setError(
        serverError?.detail ||
          serverError?.non_field_errors?.[0] ||
          "Invalid username or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-wrapper">
        {/* LEFT – FORM */}
        <div className="auth-form">
          <img src={logo} alt="Caffino" className="auth-mini-logo" />

          <h2 className="auth-heading">Login</h2>

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username or Email"
              onChange={handleChange}
              value={formData.username}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
            />

            <span className="forgot">Forgot password?</span>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          <p className="switch">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span>Signup</span>
            </Link>
          </p>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="auth-image"></div>
      </div>
    </div>
  );
};

export default Login;
