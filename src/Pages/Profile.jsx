import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
// import { CgProfile } from "react-icons/cg";
import Footer from "../Components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("user");
  const [userEmail, setUserEmail] = useState("No Email");

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!authStatus) {
      navigate("/home");
    } else {
      setIsAuthenticated(true);
      setUserName(currentUser?.username || " ");
      setRole(currentUser?.role || "user");
      setUserEmail(currentUser?.email || "No Email");
    }
  }, [navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
    localStorage.clear();
    setIsAuthenticated(false);
    setUserName("user");
    setUserEmail("No Email");
    alert("Your account has been deleted successfully.");
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUserName("user");
    setUserEmail("No Email");
    navigate("/home");
  };
  const handleAdmin = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser?.role === "admin") {
      setUserName(currentUser.username);
      navigate("/admin");
    } else {
      setUserName(currentUser.username);
      alert("You do not have admin privileges.");
      navigate("/home");
    }
  };
  
  return (
    <div>
      <NavBar />
      <div style={styles.profileContainer}>
      <h2>User Profile</h2>
        {/* <CgProfile size={60} /> */}
        <div style={styles.profileImage}>
            <img
              style={styles.img}
              src="https://picsum.photos/200/300"
              alt="Profile"
            />
          </div>
          <br />
        <div style={styles.profileInfo}>
          <label>Email:{userEmail}</label>
          <br />
          <label>User Name:{userName}</label>
          <br />
        </div>
        {isAuthenticated ? (
          <>
            <button style={styles.logoutButton} type="button" onClick={() => handleLogout()}>
              Logout
            </button>
            {
              role === "admin" && (
                <button style={styles.adminButton} type="button" onClick={() => handleAdmin()}>
                  Admin
                </button>
              ) 
            }
            {/* <button style={styles.adminButton} type="button" onClick={()=>handleAdmin()}>
              Admin
            </button> */}
            <button style={styles.deleteButton} type="button" onClick={handleDelete}>
              Delete Account
            </button>
          </>
        ) : (
          <button style={styles.loginButton} type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Styles
const styles = {
  img: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
  profileImage: {
      display: "flex",
      height: "100px",
      width: "100px",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f8f8f8",
      borderRadius: "10px",
      marginTop: "50px",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
      margin: "auto",
    },
    
  profileContainer: {
    display: "flex",
    fontweight:"bold",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    marginTop: "50px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    width: "300px",
    margin: "auto",
  },
  profileInfo: {
    fontSize: "16px",
    color: "#333",
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "left",
  },
  loginButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  adminButton: {
    padding: "10px 20px",
    backgroundColor: "#1e90ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Profile;
