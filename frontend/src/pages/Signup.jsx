import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import logo from "../assets/caffino-logo.png";

const Signup = () => {
  const navigate = useNavigate();

  // 1. Local State to hold input values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Update state when user types (uses the 'name' attribute of inputs)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. The API Call logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    setError("");

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      // Handles errors from Django (e.g., username already exists)
      const serverError = err.response?.data;
      setError(
        serverError?.username?.[0] ||
          serverError?.email?.[0] ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-wrapper">
        <div className="auth-form">
          <img src={logo} alt="Caffino" className="auth-mini-logo" />

          <h2 className="auth-heading">Signup</h2>

          {/* Error Message Display */}
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="switch">
            Already have an account?{" "}
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>
        </div>

        <div className="auth-image"></div>
      </div>
    </div>
  );
};

export default Signup;
