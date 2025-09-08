import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { useAuth } from "./context/useAuth.js";
import "./styles/navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h2>Ezitech</h2>
      <div className="links">
        {!user ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
