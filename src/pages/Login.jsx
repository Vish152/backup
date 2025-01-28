import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";

import logo from "/src/assets/images/logo/icon-logo.png";
// import facebook from "/src/assets/images/auth/1.png";
// import google from "/src/assets/images/auth/2.png";

export default function Login() {
  // Use navigate to redirect after login
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Simulating login logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy check for user role (You would actually check the credentials from an API)
    if (formData.username === "doctor" && formData.password === "password") {
      // Redirect to Doctor Panel if credentials match
      navigate("/doctor-panel");
    } else if (
      formData.username === "reception" &&
      formData.password === "password"
    ) {
      // Redirect to Reception Panel if credentials match
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="auth-main"
      style={{
        background: "linear-gradient(to right,rgb(45, 14, 78),rgb(31, 106, 236))", // Gradient background
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="codex-authbox"
        style={{
          background: "linear-gradient(145deg, #f1f1f1, #d0d0d0)",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        <div
          className="auth-header"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <div className="codex-brand">
            <Link to={"/"}>
              <img className="img-fluid" src={logo} alt="" />
              <span className="ms-2">HMS</span>
            </Link>
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
            Welcome to HMS
          </h3>
          <h6 style={{ fontSize: "14px", color: "#777" }}>
            don't have an account?
            <Link className="text-primary" to={"/register"}>
              {" "}
              create an account
            </Link>
          </h6>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-20">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-20">
            <Form.Label htmlFor="password">Password</Form.Label>
            <InputGroup className="group-input ">
              <Form.Control
                className="showhide-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputGroup.Text
                className={`toggle-show d-flex align-items-center fa ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-20">
            <div
              className="auth-remember"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Form.Check className="custom-chek">
                <Form.Check.Input
                  id="agree"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <Form.Check.Label htmlFor="agree">Remember me</Form.Check.Label>
              </Form.Check>
              <Link className="text-primary f-pwd" to={"/forgot-password"}>
                Forgot your password?
              </Link>
            </div>
          </Form.Group>
          <Form.Group className="mb-20">
            <Button
              className="btn btn-primary"
              type="submit"
              style={{
                background: "linear-gradient(45deg, #ff6a00, #ff4b2b)",
                border: "none",
                color: "white",
                fontSize: "16px",
                transition: "background 0.3s ease-in-out",
              }}
            >
              <i className="fa fa-sign-in"></i> Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
