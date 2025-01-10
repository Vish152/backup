import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Add_doctor() {
  const [Doctordata, setDoctordata] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    education: "",
    designation: "",
    department: "",
    categories: "",
    jobLocation: "",
    website: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    facebookUrl: "http://www.facebook.com/",
    twitterUrl: "http://www.twitter.com/",
    instagramUrl: "http://www.instagram.com/",
    googlePlusUrl: "http://www.plus.google.com",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    const newErrors = validate();
    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      alert("Doctor saved successfully!");
      setDoctordata([...Doctordata, { formData }]);
      console.log(Doctordata);
    }
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    //check required fields
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.education) newErrors.education = "Education is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.categories) newErrors.categories = "Categories is required";
    if (!formData.jobLocation)
      newErrors.jobLocation = "Job Location is required";
    if (!formData.website) newErrors.website = "Website is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = "Email is not valid";

    // Phone validation (10 digit number)
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number is not valid";
    }

    // Password validation (Minimum 8 characters, at least one letter and one number)
    if (
      formData.password &&
      !/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(formData.password)
    )
      newErrors.password = "Password is not valid";

    // URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    ["facebookUrl", "twitterUrl", "instagramUrl", "googlePlusUrl"].forEach(
      (feild) => {
        if (formData[feild] && !urlRegex.test(formData[feild]))
          newErrors[feild] = "URL is not valid";
      }
    );
    return newErrors;
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Add Doctor" />
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
                          {errors.firstName && (
                            <p style={{ color: "red" }}>{errors.firstName}</p>
                          )}
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
                          {errors.lastName && (
                            <p style={{ color: "red" }}>{errors.lastName}</p>
                          )}
                        </Form.Group>
                      </Col>
                      {/* Date */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
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
                          {errors.gender && (
                            <p style={{ color: "red" }}>{errors.gender}</p>
                          )}
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
                          {errors.address && (
                            <p style={{ color: "red" }}>{errors.address}</p>
                          )}
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
                          {errors.education && (
                            <p style={{ color: "red" }}>{errors.education}</p>
                          )}
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
                          {errors.designation && (
                            <p style={{ color: "red" }}>{errors.designation}</p>
                          )}
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
                          {errors.department && (
                            <p style={{ color: "red" }}>{errors.department}</p>
                          )}
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
                          {errors.categories && (
                            <p style={{ color: "red" }}>{errors.categories}</p>
                          )}
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
                            <option value="Select">Select</option>
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
                          {errors.jobLocation && (
                            <p style={{ color: "red" }}>{errors.jobLocation}</p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Website URL</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="URL"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form>
                          <Form.Group className="mb-20">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <p style={{ color: "red" }}>{errors.email}</p>
                            )}
                          </Form.Group>
                        </Form>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          {errors.phone && (
                            <p style={{ color: "red" }}>{errors.phone}</p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                          {errors.password && (
                            <p style={{ color: "red" }}>{errors.password}</p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Re-enter Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                          {errors.confirmPassword && (
                            <p style={{ color: "red" }}>
                              {errors.confirmPassword}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                      <Form.Group>
                        <Link
                          className="btn btn-sm btn-primary"
                          href="javascript:void(0);"
                          onClick={handleSave}
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

            <Col md={15}>
              <Card>
                <Card.Header>
                  <h4>Doctor Social Media Info</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group className="mb-20">
                          <Form.Label>Facebook URL</Form.Label>
                          <Form.Control
                            type="url"
                            value={formData.facebookUrl}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-20">
                          <Form.Label>Twitter URL</Form.Label>
                          <Form.Control
                            type="url"
                            value={formData.twitterUrl}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-20">
                          <Form.Label>Instagram URL</Form.Label>
                          <Form.Control
                            type="url"
                            value={formData.instagramUrl}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-20">
                          <Form.Label>Google Plus URL</Form.Label>
                          <Form.Control
                            type="url"
                            value={formData.googlePlusUrl}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
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
