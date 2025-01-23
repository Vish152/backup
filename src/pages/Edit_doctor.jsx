import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Container,
  Button,
  Alert,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";

const BASE_URL = "http://192.168.90.108:5000/api"; // Correct API base URL

export default function Edit_doctor() {
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
    joblocation: "",
    website: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    googlePlusUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch doctor data
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const encodedEmail = encodeURIComponent(email); // Encode the email to handle special characters

        const response = await fetch(`${BASE_URL}/V1/admin/email`, {
          method: "PUT", // Correct method for fetching data
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Get raw response text for debugging
          console.error(
            `Error fetching data. Status: ${response.status}, Response: ${errorText}`
          );
          throw new Error(
            `Failed to fetch doctor data. Status: ${response.status}`
          );
        }

        const data = await response.json(); // Parse JSON once

        console.log("Fetched Data:", data); // Check the structure of the fetched data

        // Assuming the response fields match formData
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          dob: data.dob || "",
          gender: data.gender || "",
          address: data.address || "",
          education: data.education || "",
          designation: data.designation || "",
          department: data.department || "",
          categories: data.categories || "",
          joblocation: data.joblocation || "",
          website: data.website || "",
          email: data.email || "",
          phone: data.phone || "",
          password: data.password || "",
          confirmPassword: data.confirmPassword || "",
          facebookUrl: data.facebookUrl || "",
          twitterUrl: data.twitterUrl || "",
          instagramUrl: data.instagramUrl || "",
          googlePlusUrl: data.googlePlusUrl || "",
        });
      } catch (error) {
        setError(error.message); // Set error message to display
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle save operation
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${BASE_URL}/V1/admin/email`, {
        method: "PUT", // Assuming POST method to save changes
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get raw response text for debugging
        console.error(
          `Error saving data. Status: ${response.status}, Response: ${errorText}`
        );
        throw new Error(
          `Failed to save doctor data. Status: ${response.status}`
        );
      }

      const data = await response.json(); // Parse JSON once

      console.log("Save Success:", data);
      setError(null); // Clear previous errors
      alert("Doctor data updated successfully!"); // Show success message
    } catch (error) {
      console.error("Error saving doctor data:", error);
      setError(error.message || "Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Edit Doctor" />
      {/* Breadcrumb End */}

      {/* Error Alert (Only show when error is set and loading has completed) */}
      {error && !loading && <Alert variant="danger">{error}</Alert>}

      {/* Theme body start */}
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
                            value={formData.firstName || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dob"
                            value={formData.dob || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender || ""}
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
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Education</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Education"
                            name="education"
                            value={formData.education || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Designation</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Designation"
                            name="designation"
                            value={formData.designation || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Department</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Department"
                            name="department"
                            value={formData.department || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Categories</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Categories"
                            name="categories"
                            value={formData.categories || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Job Location</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Job Location"
                            name="joblocation"
                            value={formData.joblocation || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Website</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Website"
                            name="website"
                            value={formData.website || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Other form fields here */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password" // Corrected to password type
                            placeholder="Password"
                            name="password"
                            value={formData.password || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password" // Corrected to password type
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Social Links */}
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Instagram URL</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Instagram URL"
                            name="instagramUrl"
                            value={formData.instagramUrl || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Twitter URL</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Twitter URL"
                            name="twitterUrl"
                            value={formData.twitterUrl || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Google+ URL</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Google+ URL"
                            name="googlePlusUrl"
                            value={formData.googlePlusUrl || ""}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      variant="primary"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button variant="danger" className="ml-2">
                      Cancel
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </SimpleBar>
      {/* Theme body end */}
    </div>
  );
}
