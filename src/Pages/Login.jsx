import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

const Login = () => {
  const [, setCookie] = useCookies(["user"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission reload
    //const password = e.target.password.value;
   

    if (!username || !password) {
      setError("Please fill out both fields");
      return;
    } else {

      // Set user cookie (Valid for 1 day)
      setCookie("user", username, { path: "/", maxAge: 86400 });

      // Navigate to the Welcome page
      navigate("/welcome", { state: { username } });
    } 
  };

  return (
    <CookiesProvider>
      <div className="login-container" style={{ marginTop: "100px" }}>
        <h1>Login</h1>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password" password={passwordRef}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </CookiesProvider>

  );
};

export default Login;
