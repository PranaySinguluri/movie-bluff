import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form submission from reloading the page

    if (username === "" || password === "") {
      alert("Please fill out both fields");
      return;
    }

    // Store user credentials (Not recommended in production)
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Retrieve stored credentials
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if ((username === storedUser && password === storedPass) || (username === "admin" && password === "admin")) {
      alert("Login successful!");
      // Navigate to the Welcome page with state
      navigate("/welcome", { state: { username } });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container" style={{marginTop: "100px"}}>
    <h1>Login</h1>
    <p className="error-message"></p> 
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    </div>
    
  );
};

export default Login;
