import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

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

      setUserName(currentUser.username || "Unknown");
      setRole(currentUser.role || "user");
      setUserEmail(currentUser.email || "No Email");
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
      <div style={styles.profileContainer}>
        <h2>User Profile</h2>
        <div style={styles.profileImage}>
          <img
            style={styles.img}
            src="https://picsum.photos/200/300"
            alt="Profile"
          />
        </div>
        <div style={styles.profileInfo}>
          <label>Email: {userEmail}</label>
          <br />
          <label>User Name: {userName}</label>
          <br />
        </div>
        {isAuthenticated ? (
          <>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
            {role === "admin" && (
              <button style={styles.adminButton} onClick={handleAdmin}>
                Admin
              </button>
            )}
            <button
              style={styles.deleteButton}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </>
        ) : (
          <button style={styles.loginButton} onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  profileImage: {
    marginBottom: "20px",
  },
  img: {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
  },
  profileInfo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  logoutButton: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  adminButton: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    marginTop: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loginButton: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Profile;