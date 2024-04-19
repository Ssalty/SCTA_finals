import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminLogin from "./LoginPage/AdminLogin";
import UserLogin from "./LoginPage/Login";
import Register from "./LoginPage/Register";
import Homepage from "./HomePage/Homepage";
import AdminPage from "./HomePage/AdminPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/adminhome" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
