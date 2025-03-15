import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

const loginStyle = {
  padding: "10px",
  width: "250px",
  borderRadius: "5px"
};


const Login = () => {
  const [, setCookie] = useCookies(["user"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill out both fields");
      return;
    }

    setCookie("user", username, { path: "3000/", maxAge: 60 });

    // Navigate to the Welcome page with state
    navigate("/home", { state: { username } });
  };

  return (
    <CookiesProvider>
      <div className="login-container" style={{ marginTop: "100px", textAlign: "center" }}>
        <h1>Login</h1>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <input className="login-username"
            type="text"  
            userid="userId"        
            name="username" 
            autoComplete="true" 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ loginStyle }}
          />
          <input className="login-password"
            type="password"
            id="password"          
            name="password"
            autoComplete="true"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ loginStyle }}
          />
          <button type="submit" style={{ padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
            Login
          </button>
        </form>
      </div>
    </CookiesProvider>
  );
};

export default Login;
