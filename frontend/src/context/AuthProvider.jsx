// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true); // to handle profile fetch state

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching profile with token:", token);
        const res = await axios.get(
          `${import.meta.env.REACT_APP_BACKEND_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user); // adjust if your backend returns differently
      } catch (err) {
        console.error(
          "Profile fetch failed:",
          err.response?.data || err.message
        );
        setUser(null);
        localStorage.removeItem("accessToken");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
