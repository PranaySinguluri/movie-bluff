// src/pages/Logout.jsx
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuth from "../Hooks/UseAuth"; // Ensure this path is correct
// import NavBar from "Components/NavBar";

const Logout = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["user"]); // Function to remove the "user" cookie
  const { logout } = useAuth(); // Logout function from the auth hook

  useEffect(() => {
    // Perform logout actions
    logout(); // Call the auth hook logout
    removeCookie("user", { path: "/" }); // Remove user cookie
    navigate("/login"); // Redirect to login page
  }, [logout, removeCookie, navigate]);  


};

export default Logout;
