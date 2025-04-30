
import { Routes, Route} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "../src/Pages/Login.jsx";
import SignUp from "../src/Pages/SignUp.jsx";
import About from "../src/Pages/About.jsx";
import Plot from "../src/Pages/Plot.jsx";
import ErrorPage from "../src/Pages/ErrorPage.jsx";
import Profile from "../src/Pages/Profile.jsx";
import Admin from "../src/Pages/Admin.jsx";

// import {Logout }from "/Users/pranaysinguluri/movie-bluff/src/Pages/Logout.jsx";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/plot" element={<Plot/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/admin" element={<Admin/>} />
      <Route path="/*" element={<ErrorPage />} /> 
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
export default App;
