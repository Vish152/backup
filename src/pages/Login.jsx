import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, InputGroup } from 'react-bootstrap';

import logo from '/src/assets/images/logo/icon-logo.png';
import facebook from '/src/assets/images/auth/1.png';
import google from '/src/assets/images/auth/2.png';

export default function Login() {
     //  Inuut value start 
     const [formData, setFormData] = useState({
        email: '',
        Remember: '',

    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: type === 'checkbox' ? checked : value,
        });

    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="auth-main">
                <div className="codex-authbox">
                    <div className="auth-header">
                        <div className="codex-brand">
                            <Link to={'/'}>
                                <img className="img-fluid" src={logo} alt="" />
                                <span className="ms-2">Medixo</span>
                            </Link>
                        </div>
                        <h3>welcome to medixo</h3>
                        <h6>
                            don't have an account?
                            <Link className="text-primary" to={'/register'}> creat an account</Link>
                        </h6>
                    </div>
                    <Form>
                        <Form.Group className="mb-20">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Email" name="email" value={formData.email}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-20">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <InputGroup className="group-input ">
                                <Form.Control className="showhide-password"  type={showPassword ? 'text' : 'password'}  placeholder="Enter Your Password"  />
                                <InputGroup.Text  className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}  >
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-20">
                            <div className="auth-remember">
                                <Form.Check className="custom-chek">
                                    <Form.Check.Input id="agree" type="checkbox" checked={formData.Remember}
                                        onChange={handleChange} />
                                    <Form.Check.Label htmlFor="agree">Remember me</Form.Check.Label>
                                </Form.Check>
                                <Link className="text-primary f-pwd" to={'/forgot-password'}>Forgot your password?</Link>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-20">
                            <Button className="btn btn-primary" type="submit">
                                <i className="fa fa-sign-in"></i> Login
                            </Button>
                        </Form.Group>
                    </Form>
                    <div className="auth-footer">
                        <h6 className="auth-with">Or login in with </h6>
                        <ul className="login-list">
                            <li>
                                <Link className="bg-fb">
                                    <img className="img-fluid" src={facebook} alt="facebook" />
                                    facebook
                                </Link>
                            </li>
                            <li>
                                <Link className="bg-google">
                                    <img className="img-fluid" src={google} alt="google" />
                                    google
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
