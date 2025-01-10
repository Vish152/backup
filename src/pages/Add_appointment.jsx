import React, { useState } from "react";
import { Row, Col, Form, Container, Card } from "react-bootstrap";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
} from "react-country-state-dropdown";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import { Link } from "react-router-dom";

const BASE_URL = "http://192.168.1.139:5000/api"; // Update with your backend API base URL

export default function Add_appointment() {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [doctor, setDoctor] = useState("");
  const [fde, setFde] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    doctorName: "",
    patientName: "",
    mobileNo: "",
    address: "",
    reference: "",
    appointmentTime: "",
    fdeName: "",
    note: "",
    email: "",
    gender: "",
    departmentName: "",
    appointmentWith: "",
    country: "",
    state: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  const doctorsList = ["Dr. Smith", "Dr. Lee", "Dr. Johnson", "Dr. Brown"];
  const fdeList = ["John Doe", "Jane Smith", "Alice Johnson", "Michael Brown"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSetCountry = (value) => setCountry(value);
  const handleSetState = (value) => setState(value);
  const handleSetCity = (value) => setCity(value);

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "date",
      "doctorName",
      "patientName",
      "mobileNo",
      "address",
      "reference",
      "appointmentTime",
      "fdeName",
      "note",
      "email",
      "gender",
      "departmentName",
      "appointmentWith",
      "country",
      "state",
      "city",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    const phoneRegex = /^[0-9]{10}$/;
    if (formData.mobileNo && !phoneRegex.test(formData.mobileNo)) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }

    return newErrors;
  };

  const handleSubmit = async (saveType) => {
    const validationErrors = validate();
    console.log("Form Data:", formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending request to backend...");
        const response = await fetch(`${BASE_URL}/V1/appointment/addAppointment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, saveType }),
        });

        console.log("Response received:", response);

        if (response.ok) {
          alert("Appointment added successfully");

          setFormData({
            date: "",
            doctorName: "",
            patientName: "",
            mobileNo: "",
            address: "",
            reference: "",
            appointmentTime: "",
            fdeName: "",
            note: "",
            email: "",
            gender: "",
            departmentName: "",
            appointmentWith: "",
            country: "",
            state: "",
            city: "",
          });

          // Reset country, state, and city
          setCountry(null);
          setState(null);
          setCity(null);
        } else {
          const errorData = await response.json();
          console.error("Error response from API:", errorData);
          alert("Failed to add appointment");
        }
      } catch (error) {
        console.error("Error adding appointment:", error);
        alert("An error occurred while adding the appointment");
      }
    }
  };
  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Add Appointment" />
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
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
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control
                          as="select"
                          name="doctorName"
                          value={doctor}
                          onChange={(e) => {
                            setDoctor(e.target.value);
                            setFormData((prev) => ({
                              ...prev,
                              doctorName: e.target.value,
                            }));
                          }}
                        >
                          <option value="">Select Doctor</option>
                          {doctorsList.map((doctorName, index) => (
                            <option key={index} value={doctorName}>
                              {doctorName}
                            </option>
                          ))}
                          {errors.doctorName && (
                            <p style={{ color: "red" }}>{errors.doctorName}</p>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Col>
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
                        {errors.patientName && (
                          <p style={{ color: "red" }}>{errors.patientName}</p>
                        )}
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
                        {errors.mobileNo && (
                          <p style={{ color: "red" }}>{errors.mobileNo}</p>
                        )}
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
                        {errors.address && (
                          <p style={{ color: "red" }}>{errors.address}</p>
                        )}
                      </Form.Group>
                    </Col>

                    {/* Reference */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Reference</Form.Label>
                        <Form.Control
                          type="text"
                          name="reference"
                          value={formData.reference}
                          onChange={handleInputChange}
                          placeholder="Enter Reference"
                        />
                      </Form.Group>
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
                        {errors.appointmentTime && (
                          <p style={{ color: "red" }}>
                            {errors.appointmentTime}
                          </p>
                        )}
                      </Form.Group>
                    </Col>

                    {/* FDE Name Dropdown */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>FDE Name</Form.Label>
                        <Form.Control
                          as="select"
                          name="fdeName"
                          value={fde}
                          onChange={(e) => {
                            setFde(e.target.value);
                            setFormData((prev) => ({
                              ...prev,
                              fdeName: e.target.value,
                            }));
                          }}
                        >
                          <option value="">Select FDE</option>
                          {fdeList.map((fdeName, index) => (
                            <option key={index} value={fdeName}>
                              {fdeName}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Email"
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
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

                    {/* Department Name */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="departmentName"
                          value={formData.departmentName}
                          onChange={handleInputChange}
                          placeholder="Enter Department Name"
                        />
                      </Form.Group>
                    </Col>

                    {/* Appointment With */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Appointment With</Form.Label>
                        <Form.Control
                          type="text"
                          name="appointmentWith"
                          value={formData.appointmentWith}
                          onChange={handleInputChange}
                          placeholder="Enter Appointment With"
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
                              country: value.name,
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
                            setFormData((prev) => ({ ...prev, state: value.name }));
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
                            setFormData((prev) => ({ ...prev, city: value.name }));
                          }}
                        />
                      </Form.Group>
                    </Col>

                    {/* Note */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                          placeholder="Add Notes"
                        />
                      </Form.Group>
                    </Col>

                    <Form.Group className="text-end mb-0">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "30px" }}
                        onClick={() => handleSubmit("save")}
                      >
                        Save
                      </button>
                      <Link
                        to=""
                        className="btn btn-danger ms-2"
                        style={{ marginTop: "30px" }}
                      >
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
    </div>
  );
}
