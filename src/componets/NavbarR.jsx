import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  FaClock,
  FaCalendarAlt,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";

export default function NavBarR() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="navbar-container"
      style={{ width: "auto", maxWidth: "100%" }}
    >
      <Container fluid>
        <div className="navbar-content">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb-nav">
            <Link to="/">Dashboard</Link>
            <span>/</span>
            <Link to="/appointment-list" className="hover-link">
              <span className="link-text">Appointment List</span>
              <FaClipboardList className="icon-hover" />
            </Link>
            <span>/</span>
            <Link to="/add-appointment" className="hover-link">
              <span className="link-text">Add Appointment</span>
              <FaPlusCircle className="icon-hover" />
            </Link>
            <span>/</span>
            <Link to="/enquiry-list" className="hover-link">
              <span className="link-text">Enquiry List</span>
              <FaClipboardList className="icon-hover" />
            </Link>
            <span>/</span>
            <Link to="/add-enquiry" className="hover-link">
              <span className="link-text">Add Enquiry</span>
              <FaPlusCircle className="icon-hover" />
            </Link>
          </nav>

          {/* Right Section: Time & Date */}
          <div className="date-time">
            <div className="time-box">
              <FaClock />
              {time}
            </div>
            <div className="date-box">
              <FaCalendarAlt />
              {formattedDate}
            </div>
          </div>
        </div>
      </Container>

      {/* CSS Styling */}
      <style>
        {`
          .navbar-container {
            background: linear-gradient(to right, #64b5f6, #e3f2fd);
            padding: 14px 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            width: auto;
            max-width: 100%;
          }

          .navbar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .breadcrumb-nav {
            display: flex;
            gap: 16px;
            font-weight: 625;
            font-size: 15px;
            color: #000;
            align-items: center;
          }

          .breadcrumb-nav a {
            text-decoration: none;
            color: #000;
            transition: color 0.3s ease-in-out;
            display: flex;
            align-items: center;
            gap: 8px;
            position: relative;
          }

          .breadcrumb-nav a:hover {
            color: #333;
            text-decoration: underline;
          }

          .breadcrumb-nav span {
            margin: 1 2px;
          }

          .hover-link {
            display: flex;
            align-items: center;
            position: relative;
            width: 140px;
            justify-content: center;
          }

          .link-text {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            position: absolute;
          }

          .icon-hover {
            opacity: 0;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            position: absolute;
            transform: scale(0.8); /* Initially smaller */
          }

          .hover-link:hover .link-text {
            opacity: 0;
            transform: scale(0.8);
          }

          .hover-link:hover .icon-hover {
            opacity: 1;
            transform: scale(1); /* Back to normal size */
          }

          .date-time {
            display: flex;
            gap: 12px;
          }

          .time-box, .date-box {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.7);
            padding: 8px 14px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 18px;
            color: #000;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
}
