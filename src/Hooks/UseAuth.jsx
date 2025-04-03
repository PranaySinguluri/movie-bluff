// import { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const useAuth = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const timerDuration = 120000; // 2 minutes
//   const logoutTimer = useRef(null); // Use ref to persist timer across renders

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const resetTimer = useCallback(() => {
//     if (logoutTimer.current) {
//       clearTimeout(logoutTimer.current);
//     }
//     // eslint-disable-next-line no-use-before-define
//     logoutTimer.current = setTimeout(() => {
//       logout();
//     }, timerDuration);
//   }, [logout]); // logout is memoized

//   const removeActivityListener = useCallback(() => {
//     window.removeEventListener("mousemove", resetTimer);
//     window.removeEventListener("keydown", resetTimer);
//     if (logoutTimer.current) {
//       clearTimeout(logoutTimer.current);
//     }
//   }, [resetTimer]); // resetTimer is memoized

//   const logout = useCallback(() => {
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("currentUser");
//     removeActivityListener();
//     alert("Logged out due to inactivity.");
//     navigate("/login");
//   }, [navigate, removeActivityListener]); // Dependencies for logout

//   const startActivityListener = useCallback(() => {
//     window.addEventListener("mousemove", resetTimer);
//     window.addEventListener("keydown", resetTimer);
//     resetTimer();
//   }, [resetTimer]); // resetTimer is memoized

//   const signup = async (email, username, password) => {
//     setLoading(true);
//     try {
//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       if (users.find((user) => user.username === username)) {
//         throw new Error("Username already taken");
//       }
//       const newUser = { email, username, password };
//       users.push(newUser);
//       localStorage.setItem("users", JSON.stringify(users));
//       alert("Signup successful! You can now log in.");
//       navigate("/login");
//     } catch (err) {
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (username, password) => {
//     setLoading(true);
//     try {
//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const user = users.find((u) => u.username === username && u.password === password);
//       if (!user) throw new Error("Invalid username or password");

//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       navigate("/home");
//       startActivityListener();
//     } catch (err) {
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";

//   useEffect(() => {
//     if (isAuthenticated()) {
//       startActivityListener();
//     }
//     return () => removeActivityListener();
//   }, [startActivityListener, removeActivityListener]); // Stable dependencies

//   return { signup, login, logout, loading, isAuthenticated };
// };

// export default useAuth;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const timerDuration = 120000; // 2 minutes
  let logoutTimer = null;

  const resetTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    logoutTimer = setTimeout(() => {
      logout();
    }, timerDuration);
  };

  const startActivityListener = () => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();
  };

  const removeActivityListener = () => {
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
    clearTimeout(logoutTimer); // Clear the logout timer
  };

  const signup = async (email, username, password) => {
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find((user) => user.username === username)) {
        throw new Error("Username already taken");
      }
      const newUser = { email, username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.username === username && u.password === password);
      if (!user) throw new Error("Invalid username or password");

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
      startActivityListener();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    removeActivityListener();
    alert("Logged out due to inactivity.");
    navigate("/login");
  };

  const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (isAuthenticated()) {
      startActivityListener();
    }
    return () => removeActivityListener();
  },); // Only include isAuthenticated here since startActivityListener and removeActivityListener are stable functions

  return { signup, login, logout, loading, isAuthenticated };
};

export default useAuth;
