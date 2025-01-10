import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup, Button, Row, Col, Container  } from 'react-bootstrap';
import logo from '/src/assets/images/logo/icon-logo.png';
import facebook from '/src/assets/images/auth/1.png';
import google from '/src/assets/images/auth/2.png';

export default function Register() {
    //  Inuut value start 
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        MobileNo: '',
        IAgree: '',

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
        <section className="py-100">
            <Container>
                <Row>
                    <Col>
                        <div className="codex-authbox">
                            <div className="auth-header">
                                <div className="codex-brand">
                                    <Link to={'/'}>
                                        <img className="img-fluid" src={logo} alt="" />
                                        <span className="ms-2">Medixo</span>
                                    </Link>
                                </div>
                                <h3>Create your account</h3>
                                <h6>
                                    Already have an account?
                                    <Link className="text-primary" to={'/login'}>login in here</Link>
                                </h6>
                            </div>
                            <Form>
                                <Form.Group className="mb-20">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Name" required="" name="Name" value={formData.Name}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-20">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Your Email" required="" name="Email" value={formData.Email}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-20">
                                    <Form.Label>Mobile No.</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Phone Number" required="" name="Mobile" value={formData.Mobile}
                                        onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-20">
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <InputGroup className="group-input">
                                        <Form.Control className="showhide-password" type={showPassword ? 'text' : 'password'} placeholder="Enter Your Password" />
                                        <InputGroup.Text className={`toggle-show d-flex align-items-center fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}
                                            style={{ cursor: 'pointer' }}  >
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="">
                                    <div className="auth-remember">
                                        <Form.Check className="form-check custom-chek">
                                            <Form.Check.Input id="IAgree" type="checkbox" required="" name="IAgree" value={formData.IAgree}
                                                onChange={handleChange} />
                                            <Form.Label className="form-check-label" htmlFor="IAgree">I Agree Terms and conditions</Form.Label>
                                        </Form.Check>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-20">
                                    <Button className="btn btn-primary" type="submit">
                                        <i className="fa fa-paper-plane"></i> Register
                                    </Button>
                                </Form.Group>
                            </Form>
                            <div className="auth-footer">
                                <h6 className="auth-with">Or login in with </h6>
                                <ul className="login-list">
                                    <li>
                                        <Link className="bg-fb" href="#!">
                                            <img className="img-fluid" src={facebook} alt="facebook" />
                                            facebook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="bg-google" href="#!">
                                            <img className="img-fluid" src={google} alt="google" />
                                            google
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
  )
}
