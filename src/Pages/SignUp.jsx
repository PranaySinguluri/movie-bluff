import React, { useState } from "react";
import useAuth from "../Hooks/UseAuth.jsx";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("user"); // default role
  const [error, setError] = useState("");
  const { signup, loading } = useAuth();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateUsername = (username) => /^[a-zA-Z0-9_]{3,15}$/.test(username);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) return setError("Invalid email format");
    if (!validateUsername(username)) return setError("Username must be 3-15 characters long and contain only letters, numbers, or underscores.");
    if (!validatePassword(password)) return setError("Password must be at least 6 characters long.");

    try {
      await signup(email, username, password); // pass role to signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <form className="signup-container" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {/* <div style={{ marginTop: "10px", marginBottom: "15px" }}>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          &nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div> */}

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
