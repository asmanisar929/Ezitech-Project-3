import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth.js";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          email,
          password,
        }
      );

      login(res.data.message.user, res.data.message.accessToken);

      alert("Login successful!");
      navigate("/profile");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="page-center2">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
