// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "/Users/pranaysinguluri/movie-bluff/src/Pages/Login.jsx";
// import Homly from "/Users/pranaysinguluri/movie-bluff/src/Pages/Homly.jsx";
// import Plot from "/Users/pranaysinguluri/movie-bluff/src/Pages/Plot.jsx";
// import PrivateRoute from "/Users/pranaysinguluri/movie-bluff/src/Components /PrivateRoute.jsx";

import { Routes, Route} from "react-router-dom";
import Homly from "../src/Pages/Homly.jsx";
import Login from "../src/Pages/Login.jsx";
import SignUp from "../src/Pages/SignUp.jsx";
import About from "../src/Pages/About.jsx";
import Plot from "../src/Pages/Plot.jsx";
//import Home from "/Users/pranaysinguluri/movie-bluff/src/Pages/Homly.jsx";
import ErrorPage from "../src/Pages/ErrorPage.jsx";
import Profile from "../src/Pages/Profile.jsx";
import Admin from "../src/Pages/Admin.jsx";
// import {Logout }from "/Users/pranaysinguluri/movie-bluff/src/Pages/Logout.jsx";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Homly />} />
      <Route path="/home/*" element={<Homly />} />
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
