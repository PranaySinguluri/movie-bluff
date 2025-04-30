import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../assets/Profile.css"; // Assuming you have a CSS file for styling

const Profile = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("user");
  const [userEmail, setUserEmail] = useState("No Email");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    try {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!authStatus || !currentUser) {
        navigate("/home");
        return;
      }

      // If username is "admin", set role to "admin" and update localStorage
      if (currentUser.username === "admin") {
        currentUser = { ...currentUser, role: "admin" };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }

      setUserName(currentUser.username);
      setRole(currentUser.role);
      setUserEmail(currentUser.email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error reading localStorage:", error);
      navigate("/home");
    }
  }, [navigate]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setIsDeleting(true);
    try {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      setUserName("");
      setUserEmail("No Email");
      setRole("user");
      alert("Your account has been deleted successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error during account deletion:", error);
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      setIsAuthenticated(false);
      setUserName("");
      setUserEmail("No Email");
      setRole("user");
      navigate("/home");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <div>
      <NavBar />
      <div className="profileContainer">
        <h2>User Profile</h2>
        <div className="profileImage">
          <img
            className="profileImage"
            src="https://picsum.photos/200/300"
            alt="Profile"
          />
        </div>
        <div className="profileInfo">
          <label>Email: {userEmail}</label>
          <label>User Name: {userName}</label>
          <br />
        </div>
        {isAuthenticated ? (
          <>
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
            {role === "admin" && (
              <button className="adminButton" onClick={handleAdmin}>
                Admin
              </button>
            )}
            <button
              className="adminButton"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </>
        ) : (
          <button className="loginButton" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;