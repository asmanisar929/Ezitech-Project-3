// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth.js";
import "../styles/auth.css";

function Register() {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          fullname, // ✅ matches backend schema
          username,
          email,
          password,
        }
      );

      // ✅ your backend wraps data in ApiResponse → res.data.data
      const user = res.data.message;
      console.log("Register response:", res.data);

      // no tokens returned from register API, only user → just store user
      login(user, null);

      alert("Registration successful!");
      navigate("/profile");
    } catch (err) {
      console.error("Registration error full:", err); // log full error
      console.error("Backend response:", err.response?.data);
      alert(
        err.response?.data?.message || "Registration failed, please try again."
      );
    }
  };

  return (
    <div className="page-center1">
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
