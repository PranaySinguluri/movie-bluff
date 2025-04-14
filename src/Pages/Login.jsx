import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../Hooks/UseAuth.jsx";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
  };

  // useEffect(() => {
  //   try {
  //     const isAuthenticated = localStorage.getItem("isAuthenticated");
  //     const currentUser = localStorage.getItem("currentUser");
  //     if (isAuthenticated && currentUser) {
  //       const user = JSON.parse(currentUser);
  //       console.log("User is already logged in:", user);
  //       if (user.username === "admin") {
  //         navigate("/admin");
  //       } else {
  //         navigate("/home");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error checking authentication:", error);
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      console.log("Login successful:", user);
      if (user.username === "admin") {
        navigate("/admin");
      } else {
        console.log("User is not admin, redirecting to home");
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mb-4 flex flex-col min-h-screen">
      <NavBar />
      <form className="login-container mx-auto mt-8 w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="px-3 py-2 w-full border rounded mb-3 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <div className="relative mb-3">
          <input
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="px-3 py-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={handleToggle}
            role="button"
            aria-label={type === "password" ? "Show password" : "Hide password"}
          >
            {type === "password" ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <p className="mt-3">
          New user? <Link to="/signup" className="text-blue-500 hover:underline">Sign up here</Link>
        </p>
      </form>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Login;