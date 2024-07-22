import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  // Handle input change
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        body,
        config
      );
      localStorage.setItem("token", res.data.token); // Save token to localStorage
      console.log(res.data);
      navigate("/dashboard", { replace: true }); // Redirect to dashboard
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side: Description */}
      <div className="left-side">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1>Welcome to Dog Haven</h1>
          <p>Your one-stop site for all things dog-related!</p>
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="right-side">
        <div className="login-form-container">
          <h2>Login to Your Account</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="text-center mt-6">
            <a onClick={() => navigate("/register", { replace: true })}>
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
