import "../styles/profile.css";
import { useAuth } from "../context/useAuth.js";

function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          textAlign: "center",
          position: "fixed", // force full screen
          top: 0,
          left: 0,
        }}
      >
        <h2>Please login first</h2>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="profile-container">
        <div className="profile-card">
          <img src="/Images/img.jpg" alt="Profile" className="profile-img" />
          <h2>{user.fullname}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
