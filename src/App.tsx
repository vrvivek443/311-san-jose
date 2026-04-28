import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import OtherReports from "./components/other-reports";
import VehicleConcerns from "./components/Pages/vehicle-concern/vehicle-concerns";

function App() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">

      {/* Sidebar */}
      <div className="sidebar-wrapper" data-simplebar="true">

        {/* Header */}
        <div className="sidebar-header">
          <div>
            <img
              src="src/assets/311-Logo.png"
              className="logo-icon"
              alt="logo icon"
            />
          </div>

          <div>
            <h4 className="logo-text">311-San-Jose</h4>
          </div>

          <div className="toggle-icon ms-auto">
            <i className="bx bx-arrow-back"></i>
          </div>
        </div>

        {/* Menu */}
        <ul className="metismenu" id="menu">

          {/* ✅ Home */}
          <li>
            <a onClick={() => navigate("/")}>
              <div className="parent-icon">
                <i className="bx bx-home-alt"></i>
              </div>
              <div className="menu-title">Home</div>
            </a>
          </li>

          {/* ✅ Other Reports */}
          <li>
            <a onClick={() => navigate("/other-reports")}>
              <div className="parent-icon">
                <i className="bx bx-category"></i>
              </div>
              <div className="menu-title">Other reports</div>
            </a>
          </li>

          {/* FAQ (still static for now) */}
          <li>
            <a>
              <div className="parent-icon">
                <i className="bx bx-help-circle"></i>
              </div>
              <div className="menu-title">FAQ</div>
            </a>
          </li>

          {/* Reports Dashboard */}
          <li>
            <a className="has-arrow">
              <div className="parent-icon">
                <i className="bx bx-chart"></i>
              </div>
              <div className="menu-title">Reports Dashboard</div>
            </a>

            <ul>
              <li>
                <a>
                  <i className="bx bx-radio-circle"></i>All Services
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-radio-circle"></i>Illegal Fireworks
                </a>
              </li>
              <li>
                <a>
                  <i className="bx bx-radio-circle"></i>Vehicle Concerns
                </a>
              </li>
            </ul>
          </li>

          {/* Pay Bills */}
          <li>
            <a>
              <div className="parent-icon">
                <i className="bx bx-money"></i>
              </div>
              <div className="menu-title">Pay Bills</div>
            </a>
          </li>

        </ul>

        {/* Footer Buttons */}
        <div className="sidebar-footer">
          <button className="btn login-btn">
            <i className="bx bx-log-in"></i>
            <span className="btn-text">Login</span>
          </button>

          <button className="btn signup-btn">
            <i className="bx bx-user-plus"></i>
            <span className="btn-text">Sign Up</span>
          </button>
        </div>

      </div>

      {/* Page Content */}
      <div className="page-wrapper">
        <div className="page-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other-reports" element={<OtherReports />} />
            <Route path="/vehicle-concern" element={<VehicleConcerns />} />
          </Routes>

        </div>
      </div>

      {/* Overlay */}
      <div className="overlay toggle-icon"></div>

      {/* Back to top */}
      <a href="#" onClick={(e) => e.preventDefault()} className="back-to-top">
        <i className="bx bxs-up-arrow-alt"></i>
      </a>

      {/* Footer */}
      <footer className="page-footer">
        <p className="mb-0">Copyright &copy; 2022. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;