import React, { useState, useEffect } from "react";
import { Row, Col, Form, Container, Card } from "react-bootstrap";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
} from "react-country-state-dropdown";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import { Link } from "react-router-dom";

const BASE_URL = "http://192.168.90.135:5000/api"; // Update with your backend API base URL

export default function Add_appointment() {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [doctors, setDoctors] = useState("");
  const [fdeList, setFdeList] = useState([]); // FDE list
  const [departmentList, setDepartmentList] = useState([]);
  const [type, setType] = useState("");
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    patientName: "",
    mobileNo: "",
    address: "",
    appointmentTime: "",
    note: "",
    fdeId: "",
    departmentName: "",
    doctorId: "",
    country: "",
    state: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  // const doctorsList = ["Dr. Smith", "Dr. Lee", "Dr. Johnson", "Dr. Brown"];
  // const fdeList = ["John Doe", "Jane Smith", "Alice Johnson", "Michael Brown"];

  const typeList = ["NEW", "FOLLOW", "POSTOPERATIVE"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.toUpperCase(), // Convert input to uppercase
    }));
  };

  const handleSetCountry = (value) => setCountry(value);
  const handleSetState = (value) => setState(value);
  const handleSetCity = (value) => setCity(value);

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "date",
      "patientName",
      "mobileNo",
      "address",
      "appointmentTime",
      "note",
      "fdeId",
      "departmentName",
      "doctorId",
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
  console.log("Form Data:", formData); // Log the form data before submission
  setErrors(validationErrors);
console.log(validationErrors);
  if (Object.keys(validationErrors).length === 0) {
    setLoading(true); 
    try {
      console.log("Sending request to backend...");

      const response = await fetch(`${BASE_URL}/V1/appointment/addAppointment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, saveType }),
        }
      );

      // Log the raw response to debug issues
      console.log("Response received:", response);

      // Check if the response is OK
      if (response.ok) {
        const responseData = await response.json();
        console.log("Success response from backend:", responseData);
        alert("Appointment added successfully");

        // Reset the form
        setFormData({
          date: new Date().toISOString().split("T")[0],
          patientName: "",
          mobileNo: "",
          address: "",
          appointmentTime: "",
          note: "",
          fdeId: "",
          departmentName: "",
          doctorName: "",
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
        // Parse the error response to display meaningful information
        const errorData = await response.json();
        console.error("Error response from API:", errorData);
        alert(
          `Failed to add appointment. ${
            errorData.message || "Please try again."
          }`
        );
      }
    } catch (error) {
      console.error("Error adding appointment:", error.message);
      alert(
        "An error occurred while adding the appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
};

  const fetchDropdownData = async () => {
    try {
      const doctorResponse = await fetch(
        `${BASE_URL}/V1/appointment/doctorDropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (doctorResponse.ok) {
        const doctorData = await doctorResponse.json();
        console.log("Doctors API Response:", doctorData); // Debug API response
        setDoctors(Array.isArray(doctorData.data) ? doctorData.data : []);
      } else {
        console.error("Failed to fetch doctors:", doctorResponse.statusText);
      }

      const fdeResponse = await fetch(
        `${BASE_URL}/V1/appointment/fdeDropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (fdeResponse.ok) {
        const fdeData = await fdeResponse.json();
        console.log("FDE API Response:", fdeData);
        setFdeList(Array.isArray(fdeData.data) ? fdeData.data : []);
      } else {
        console.error("Failed to fetch FDE list:", fdeResponse.statusText);
      }

      const departmentResponse = await fetch(
        `${BASE_URL}/V1/appointment/departmentDropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (departmentResponse.ok) {
        const departmentData = await departmentResponse.json();
        console.log("Department API Response:", departmentData);
        setDepartmentList(
          Array.isArray(departmentData.data) ? departmentData.data : []
        );
      } else {
        console.error(
          "Failed to fetch FDE list:",
          departmentResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error.message);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

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
      <PageBreadcrumb pagename="Add Appointment" />
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

                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                          as="select"
                          name="type"
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value);
                            setFormData((prev) => ({
                              ...prev,
                              type: e.target.value,
                            }));
                          }}
                        >
                          <option value="">Select Type</option>
                          {typeList.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
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
                    <Col md={4}>
                      <Form.Group className="mb-20">
                        <Form.Label>FDE Name</Form.Label>
                        <Form.Select
                          name="fdeId"
                          value={formData.fdeId}
                          onChange={handleInputChange}
                        >
                          <option value="">Select FDE Name</option>
                          {fdeList &&
                            fdeList.length > 0 &&
                            fdeList.map((fde) => (
                              <option key={fde.FDEID} value={fde.FDEID}>
                                {fde.FDEID} - {fde.FDEName}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Department Name */}
                    <Col md={4} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Select
                          name="departmentName"
                          value={formData.name}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a Department</option>
                          {departmentList && departmentList.length > 0 ? (
                            departmentList.map((department) => (
                              <option
                                key={department.name}
                                value={department.name}
                              >
                                {department.department_id} - {department.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>No doctors available</option>
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Doctor Name Dropdown */}
                <Col md={4}>
                  <Form.Group className="mb-20">
                    <Form.Label>Appointment With</Form.Label>
                    <Form.Select
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a Doctor</option>
                      {doctors && doctors.length > 0 ? (
                        doctors.map((doctor) => (
                          <option
                            key={doctor.doctor_id}
                            value={doctor.doctor_id}
                          >
                            {doctor.doctor_id} - {doctor.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No doctors available</option>
                      )}
                    </Form.Select>
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
                            setFormData((prev) => ({
                              ...prev,
                              state: value.name,
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
                            setFormData((prev) => ({
                              ...prev,
                              city: value.name,
                            }));
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
