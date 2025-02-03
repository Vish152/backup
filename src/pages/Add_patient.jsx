import React, { useState } from "react";
import { Row, Col, Form, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
} from "react-country-state-dropdown";
import PageBreadcrumb from "../componets/PageBreadcrumb";

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

const BASE_URL = "http://192.168.90.143:5000/api";

export default function Add_Patient() {
  const [formData, setFormData] = useState({
    title: "",
    date:"",
    uid: "",
    patientName: "",
    gender: "",
    mobileNo: "",
    alternateNo: "",
    address: "",
    age: "",
    blood_group: "",
    maritalStatus: "",
    weight: "",
    email: "",
    height: "",
    country: "",
    state: "",
    city: "",
    patientHistory: "",
  });

  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const categories =
    (selectedDepartment && hospitalData[selectedDepartment]?.categories) || [];
  const doctors =
    (selectedCategory &&
      selectedDepartment &&
      hospitalData[selectedDepartment]?.doctors[selectedCategory]) ||
    [];

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "title",
      "date",
      "patientName",
      "gender",
      "mobileNo",
      "address",
      "age",
      "blood_group",
      "maritalStatus",
      "weight",
      "height",
      "country",
      "state",
      "city",
      "patientHistory",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.toUpperCase(), // Convert input to uppercase
    }));
  };


  const generateUID = () => {const UID = `${Date.now()}`;
  return UID;  // Example: Generate a unique ID using timestamp
  };
    
  
  const handleSubmit = async (saveType) => {
    if (!formData.uid) {
      setFormData((prevState) => ({
        ...prevState,
        uid: generateUID(), // Generate and set a unique ID
      }));
    }
  
    const validationErrors = validate();
    console.log("Form Data:", formData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending request to backend...");
        const response = await fetch(`${BASE_URL}/V1/patient/addPatient`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, saveType }),
        });
  
        console.log("HTTP Response Status:", response.status);
  
        if (response.ok) {
          alert(
            saveType === "save"
              ? "Patient saved successfully"
              : "Patient saved and appointment created successfully"
          );
          // Reset form after submission
          setFormData({
            title: "",
            // date: new Date().toISOString().split("T")[0],
            uid: "",
            date:"",
            patientName: "",
            gender: "",
            mobileNo: "",
            alternateNo: "",
            email: "",
            address: "",
            age: "",
            blood_group: "",
            maritalStatus: "",
            weight: "",
            height: "",
            country: "",
            state: "",
            city: "",
            patientHistory: "",
          });
        } else {
          const errorData = await response.json();
          console.error("Response Error Data:", errorData);
          alert(
            errorData.message ||
              "Failed to save patient details. Please try again."
          );
        }
      } catch (error) {
        console.error("Network Error:", error);
        alert("An error occurred while saving patient details.");
      }
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  const handleSetCountry = (value) => {
    setCountry(value);
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const handleSetState = (value) => {
    setState(value);
    setFormData((prev) => ({ ...prev, state: value }));
  };

  const handleSetCity = (value) => {
    setCity(value);
    setFormData((prev) => ({ ...prev, city: value }));
  };

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

  return (
    <div
      className="themebody-wrap"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #80deea)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Poppins', Arial, sans-serif",
      }}
    >
      <PageBreadcrumb pagename="Add Patient Details" />
      <Container fluid>
        <Row>
          <Col>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                borderColor: "#00bcd4",
                background: "white",
                border: "1px solid #00bcd4",
              }}
            >
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group as={Col} controlId="uid">
                        <Form.Label>Patient UID</Form.Label>
                        <Form.Control
                          type="text"
                          name="uid"
                          value={formData.uid}
                          onChange={handleInputChange}
                          placeholder="Enter UID"
                        />
                      </Form.Group>
                    </Col>
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
                        {errors.dateName && (
                          <p style={{ color: "red" }}>{errors.date}</p>
                        )}
                      </Form.Group>
                    </Col>
                    {/* </Row>

                  <Row> */}
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
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                          <option value="OTHER">OTHER</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    {/* Mobile No */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control
                          type="number"
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
                    {/* </Row>
                  <Row> */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Alternate No</Form.Label>
                        <Form.Control
                          type="number"
                          name="alternateNo"
                          value={formData.alternateNo}
                          onChange={handleInputChange}
                          placeholder="Enter Alternate Number"
                        />
                        {errors.alternateNo && (
                          <p style={{ color: "red" }}>{errors.mobileNo}</p>
                        )}
                      </Form.Group>
                    </Col>

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
                    {/* </Row>
                  <Row> */}
                    {/* Reference */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          value={formData.reference}
                          onChange={handleInputChange}
                          placeholder="Enter Age"
                        />
                        {errors.age && (
                          <p style={{ color: "red" }}>{errors.age}</p>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Blood Group</Form.Label>
                        <Form.Control
                          as="select"
                          name="blood_group"
                          value={formData.blood_group}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Marital Status</Form.Label>
                        <Form.Control
                          as="select"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Status</option>
                          <option value="SINGLE">Single</option>
                          <option value="MARRIED">Married</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    {/* </Row>

                  <Row> */}
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
                    {/* </Row>
                  <Row> */}
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
                        {errors.appointmentTime && (
                          <p style={{ color: "red" }}>
                            {errors.appointmentTime}
                          </p>
                        )}
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
                        {errors.country && (
                          <p style={{ color: "red" }}>{errors.country}</p>
                        )}
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
                              state: value.name,
                            }));
                          }}
                        />
                        {errors.state && (
                          <p style={{ color: "red" }}>{errors.state}</p>
                        )}
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
                            setFormData((prev) => ({
                              ...prev,
                              city: value.name,
                            }));
                          }}
                        />
                        {errors.city && (
                          <p style={{ color: "red" }}>{errors.city}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

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

                  <Form.Group className="text-end mb-0">
                    <Col md={12} className="text-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "30px" }}
                        onClick={() => handleSubmit("save")}
                      >
                        Save
                      </button>

                      {/* <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "30px", marginLeft: "8px" }}
                        onClick={() => handleSubmit("saveAndAppointment")}
                      >
                        Save & Appointment
                      </button> */}
                      <Link
                        to="/appointment_list"
                        className="btn btn-danger ms-2"
                        style={{ marginTop: "30px" }}
                      >
                        Cancel
                      </Link>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}