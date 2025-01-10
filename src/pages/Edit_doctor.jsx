import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Edit_doctor() {
  const [formData, setFormData] = useState({
    firstName: "Elizabeth",
    lastName: "Blackwell",
    dob: "",
    gender: "",
    education: "M.B.B.S",
    designation: "Physician",
    department: "",
    website: "http://www.example.com",
    email: "example@email.com",
    phone: "+1 50 456XXX",
    password: "Example@pass",
    confirmPassword: "Example@pass",
    facebookUrl: "http://www.facebook.com/",
    twitterUrl: "http://www.twitter.com/",
    instagramUrl: "http://www.instagram.com/",
    googlePlusUrl: "http://www.plus.google.com",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Edit Doctor" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4>Personal Information</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>last name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            className="datepicker-here form-control"
                            type="text"
                            placeholder="DD/MM/YYYY"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Gender</Form.Label>
                          <select
                            className="form-select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="Gender">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Education</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Designation</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Department</Form.Label>
                          <select
                            className="form-select hidesearch"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                          >
                            <option value="Audiologists">Audiologists</option>
                            <option value="Cardiologists">Cardiologists</option>
                            <option value="Endocrinologist">
                              Endocrinologist
                            </option>
                            <option value="Oncologists">Oncologists</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Gynaecology">Gynaecology</option>
                            <option value="Microbiology">Microbiology</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Categories</Form.Label>
                          <select
                            className="form-select hidesearch"
                            name="categories"
                            value={formData.categories}
                            onChange={handleInputChange}
                          >
                            <option value="Main">Main</option>
                            <option value="Assistant">Assistant</option>
                            <option value="Checkby">Checkby</option>
                            <option value="Madeby">Madeby</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Job Location</Form.Label>
                          <select
                            className="form-select hidesearch"
                            name="job Location"
                            value={formData.joblocation}
                            onChange={handleInputChange}
                          >
                            <option value="Ahemdabad">Ahemdabad</option>
                            <option value="Andheri">Andheri</option>
                            <option value="Baner">Baner</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Belgavi">Belgavi</option>
                            <option value="Chakan">Chakan</option>
                            <option value="Dighi">Dighi</option>
                            <option value="DP Road">DP Road</option>
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Hinjewad">Hinjewad</option>
                            <option value="HSR">HSR</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Iniranagar">Iniranagar</option>
                            <option value="Indore">Indore</option>
                            <option value="Kalaburagi">Kalaburagi</option>
                            <option value="Kemps-Corner">Kemps-Corner</option>
                            <option value="Kolhapur">Kolhapur</option>
                            <option value="Kothrud">Kothrud</option>
                            <option value="Lathur">Lathur</option>
                            <option value="Ludhiana">Ludhiana</option>
                            <option value="Mysore">Mysore</option>
                            <option value="Nashik">Nashik</option>
                            <option value="Navi-Mumbai">Navi-Mumbai</option>
                            <option value="Pimpri-Chinchwad">
                              Pimpri-Chinchwad
                            </option>
                            <option value="Sahakarnagar">Sahakarnagar</option>
                            <option value="Salunkhe-Vihar">
                              Salunkhe-Viha
                            </option>
                            <option value="Secunderabad">Secunderabad</option>
                            <option value="Surat">Surat</option>
                            <option value="Thane">Thane</option>
                            <option value="Tilak Road">Tilak Road</option>
                            <option value="Undri">Undri</option>
                            <option value="Vashi">Vashi</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Website URL</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Speciality"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Form.Group>
                        <Link
                          className="btn btn-sm btn-primary"
                          href="javascript:void(0);"
                        >
                          Save
                        </Link>
                        <Link
                          className="btn btn-sm btn-danger ml-8"
                          href="javascript:void(0);"
                        >
                          Cancel
                        </Link>
                      </Form.Group>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h4>Doctor Account Info</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-20">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-20">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-20">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-20">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Link
                        className="btn btn-sm btn-primary"
                        href="javascript:void(0);"
                      >
                        Save
                      </Link>
                      <Link
                        className="btn btn-sm btn-danger ml-8"
                        href="javascript:void(0);"
                      >
                        Cancel
                      </Link>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h4>Doctor Social Media Info</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-20">
                      <Form.Label>Facebook URL</Form.Label>
                      <Form.Control
                        type="url"
                        value={formData.facebookUrl}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-20">
                      <Form.Label>Twitter URL</Form.Label>
                      <Form.Control
                        type="url"
                        value={formData.twitterUrl}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-20">
                      <Form.Label>Instagram URL</Form.Label>
                      <Form.Control
                        type="url"
                        value={formData.instagramUrl}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-20">
                      <Form.Label>Google Plus URL</Form.Label>
                      <Form.Control
                        type="url"
                        value={formData.googlePlusUrl}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Link
                        className="btn btn-sm btn-primary"
                        href="javascript:void(0);"
                      >
                        Save
                      </Link>
                      <Link
                        className="btn btn-sm btn-danger ml-8"
                        href="javascript:void(0);"
                      >
                        Cancel
                      </Link>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </SimpleBar>
      {/* theme body end */}
    </div>
  );
}
