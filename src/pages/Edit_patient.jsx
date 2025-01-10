import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
} from "react-country-state-dropdown";

const hospitalData = {
  Cardiology: {
    categories: ["Heart Surgery", "ECG", "General Checkup"],
    doctors: {
      "Heart Surgery": ["Dr. A", "Dr. B"],
      ECG: ["Dr. C", "Dr. D"],
      "General Checkup": ["Dr. E", "Dr. F"],
    },
  },
  Neurology: {
    categories: ["Brain Surgery", "EEG", "Neuropathy"],
    doctors: {
      "Brain Surgery": ["Dr. G", "Dr. H"],
      EEG: ["Dr. I", "Dr. J"],
      Neuropathy: ["Dr. K", "Dr. L"],
    },
  },
  Pediatrics: {
    categories: ["General Pediatrics", "Vaccination"],
    doctors: {
      "General Pediatrics": ["Dr. M", "Dr. N"],
      Vaccination: ["Dr. O", "Dr. P"],
    },
  },
};
export default function Edit_patient() {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "Sarah Smith",
    date: "10/12/1999",
    age: "25",
    gender: "",
    bloodGroup: "",
    weight: "68 kg", // default values
    height: "5.2",
    email: "example@email.com",
    phone: "+1 50 456XXX",
    city: "Barcelona", // default selected
    state: "",
    country: "",
    postalCode: "",
    status: "",
    address:
      "463 Avenida Doutor José Singer,6- Conjunto Residencial Humaitá, São Vicente, SP, Brasil",
    patientHistory:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
  });

  const handleSetCountry = (value) => setCountry(value);
  const handleSetState = (value) => setState(value);
  const handleSetCity = (value) => setCity(value);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setSelectedCategory(""); // Reset category when department changes
    setSelectedDoctor(""); // Reset doctor when department changes
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedDoctor(""); // Reset doctor when category changes
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const categories =
    (selectedDepartment && hospitalData[selectedDepartment]?.categories) || [];
  const doctors =
    (selectedCategory &&
      selectedDepartment &&
      hospitalData[selectedDepartment]?.doctors[selectedCategory]) ||
    [];

  // Handle input changes
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
      <PageBreadcrumb pagename="Edit Patient" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4>Patient Information</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      {/* Title */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter Title"
                          />
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

                      {/* Doctor Name Dropdown */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>UID</Form.Label>
                          <Form.Control
                            type="number"
                            name="uid"
                            value={formData.uid}
                            onChange={handleInputChange}
                            placeholder="UID"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* Patient Name */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Patient Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            placeholder="Enter Patient Name"
                          />
                        </Form.Group>
                      </Col>

                      {/* Gender */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
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
                            <option value="Other">Other</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      {/* Mobile No */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Mobile No</Form.Label>
                          <Form.Control
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleInputChange}
                            placeholder="Enter Mobile Number"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Alternate No</Form.Label>
                          <Form.Control
                            type="text"
                            name="alternateNo"
                            value={formData.alternateNo}
                            onChange={handleInputChange}
                            placeholder="Enter Alternate Number"
                          />
                        </Form.Group>
                      </Col>

                      {/* Address */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter Address"
                          />
                        </Form.Group>
                      </Col>
                      {/* Reference */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            type="text"
                            name="age"
                            value={formData.reference}
                            onChange={handleInputChange}
                            placeholder="Enter Age"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Blood Group</Form.Label>
                          <Form.Control
                            type="text"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            placeholder="Enter Blood Group"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Patient Weight</Form.Label>
                          <Form.Control
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            placeholder="Enter Weight"
                          />
                        </Form.Group>
                      </Col>

                      {/* Row 5 */}
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Patient Height</Form.Label>
                          <Form.Control
                            type="text"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            placeholder="Enter Height"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      {/* Department Dropdown */}
                      <Col md={4} className="mb-4">
                        <div className="mb-3"></div>
                        <label htmlFor="department" className="form-label">
                          Department
                        </label>
                        <select
                          id="department"
                          className="form-control"
                          value={selectedDepartment}
                          onChange={handleDepartmentChange}
                        >
                          <option value="">Select Department</option>
                          {Object.keys(hospitalData).map((department) => (
                            <option key={department} value={department}>
                              {department}
                            </option>
                          ))}
                        </select>
                      </Col>

                      {/* Category Dropdown */}
                      <Col md={4} className="mb4">
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">
                            Category
                          </label>
                          <select
                            id="category"
                            className="form-control"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            disabled={!categories} // Disable if no department selected
                          >
                            <option value="">Select Category</option>
                            {categories &&
                              categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                          </select>
                        </div>
                      </Col>

                      <Col md={4} className="mb4">
                        {/* Doctor Dropdown */}
                        <div className="mb-3">
                          <label htmlFor="doctor" className="form-label">
                            Doctor
                          </label>
                          <select
                            id="doctor"
                            className="form-control"
                            value={selectedDoctor}
                            onChange={handleDoctorChange}
                            disabled={!doctors} // Disable if no category selected
                          >
                            <option value="">Select Doctor</option>
                            {doctors &&
                              doctors.map((doctor) => (
                                <option key={doctor} value={doctor}>
                                  {doctor}
                                </option>
                              ))}
                          </select>
                        </div>
                      </Col>

                      {/* Appointment Time */}
                      <Col md={4} className="mb-4">
                        <Form.Group className="mb-3">
                          <Form.Label>Appointment Time</Form.Label>
                          <Form.Control
                            type="time"
                            name="appointmentTime"
                            value={formData.appointmentTime}
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
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>Patient History</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="patientHistory"
                            value={formData.patientHistory}
                            onChange={handleInputChange}
                            placeholder="Enter Patient History"
                          />
                        </Form.Group>
                      </Col>

                      {/* Repeat for other fields */}
                      <Form.Group className="text-end mb-0">
                        <Button
                          type="submit"
                          className="btn btn-sm btn-primary"
                        >
                          Submit
                        </Button>
                        <Link className="btn btn-sm btn-danger ml-8">
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
