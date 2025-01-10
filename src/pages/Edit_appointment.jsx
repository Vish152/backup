import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
} from "react-country-state-dropdown";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Edit_appointment() {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "Sarah",
    lastName: "Smith",
    dateOfBirth: "10/12/1999",
    gender: "",
    department: "",
    appointmentWith: "Dr. Hal Appeno",
    appointmentDate: "20/03/2023",
    appointmentTime: "",
    phone: "+1 50 456XXX",
    email: "example@email.com",
    city: "",
    state: "",
    country: "",
    postalCode: "395008",
    address:
      "463 Avenida Doutor José Singer,6- Conjunto Residencial Humaitá, São Vicente, SP, Brasil",
    notes: "Nothing",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSetCountry = (value) => setCountry(value);
  const handleSetState = (value) => setState(value);
  const handleSetCity = (value) => setCity(value);

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Edit Appointment" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <h4>Edit Appointment</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            as="select"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                          >
                            <option value="">Title</option>
                            <option value="Miss">Miss</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="text"
                            name="dateOfBirth"
                            placeholder="DD/MM/YYYY"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Department Name</Form.Label>
                          <Form.Control
                            as="select"
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
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Appointment With</Form.Label>
                          <Form.Control
                            type="text"
                            name="appointmentWith"
                            placeholder="Enter Doctor Name"
                            value={formData.appointmentWith}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Appointment Date</Form.Label>
                          <Form.Control
                            type="text"
                            name="appointmentDate"
                            placeholder="Select Appointment Date"
                            value={formData.appointmentDate}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Appointment Time</Form.Label>
                          <Form.Control
                            type="time"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Country Dropdown */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Country</Form.Label>
                          <CountryDropdown
                            className="custom-dropdown"
                            searchable={true}
                            value={country}
                            style={{
                              width: "100%",
                            }}
                            onChange={(e, value) => {
                              console.log(value);
                              handleSetCountry(value);
                              setFormData((prev) => ({
                                ...prev,
                                country: value,
                              }));
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* State Dropdown */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>State</Form.Label>
                          <StateDropdown
                            className="custom-dropdown"
                            country={country}
                            searchable={true}
                            value={state}
                            style={{
                              width: "100%",
                            }}
                            onChange={(e, value) => {
                              handleSetState(value);
                              setFormData((prev) => ({
                                ...prev,
                                state: value,
                              }));
                            }}
                          />
                        </Form.Group>
                      </Col>

                      {/* City Dropdown */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <CityDropdown
                            className="custom-dropdown"
                            country={country}
                            searchable={true}
                            state={state}
                            value={city}
                            style={{
                              width: "100%",
                            }}
                            onChange={(e, value) => {
                              handleSetCity(value);
                              setFormData((prev) => ({ ...prev, city: value }));
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Postal/zip Code</Form.Label>
                          <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Enter Postal/zip Code"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Enter Patient Address"
                            value={formData.address}
                            onChange={handleInputChange}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Nots</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Patient History"
                            value={formData.notes}
                            onChange={handleInputChange}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      {/* Repeat the same for other fields */}
                      <Form.Group className="text-end mb-0">
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary"
                        >
                          Submit
                        </button>
                        <Link to="/" className="btn btn-sm btn-danger ml-8">
                          Cancel
                        </Link>
                      </Form.Group>
                    </Row>
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
