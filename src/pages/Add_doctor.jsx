import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Container, Button, Alert } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import PageBreadcrumb from '../componets/PageBreadcrumb';

const BASE_URL = 'http://192.168.90.206:5000/api'; // Correct API base URL

export default function Add_doctor() {
  const [formData, setFormData] = useState({
    name: '',
    doctor_type: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    job_location: '',
    phone: '',
    department_id: '',
    profile: '', // Assuming this is a URL or file path
    age: '', // Replaced dob with age
    gender: '', // Added gender
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // This will store the fetch or submit error
  const [errors, setErrors] = useState({}); // Error state for form validation

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const email = 'drrizwan@hhc.com'; // Replace with actual email or dynamic value
        const encodedEmail = encodeURIComponent(email); // Encode the email to handle special characters
        const response = await fetch(`${BASE_URL}/V1/admin/addDoctor`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data); // Populate form fields with the fetched data
        } else {
          throw new Error('Failed to fetch doctor data');
        }
      } catch (error) {
        setError(null); // Clear error when the component mounts and data is fetched
        console.error('Error fetching doctor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []); // Empty dependency array to run effect once when component mounts

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation example
    let validationErrors = {};

    // Check required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "profile") { // 'profile' may not be required
        validationErrors[key] = `${key} is required`;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors
      return;
    }

    try {
      setLoading(true); // Set loading state while submitting data

      const response = await fetch(`${BASE_URL}/V1/admin/addDoctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON in the request body
      });

      if (response.ok) {
        const result = await response.json();
        // Handle success, e.g., display success message or redirect
        alert('Doctor added successfully');
        console.log('Doctor added:', result);
      } else {
        throw new Error('Failed to add doctor');
      }
    } catch (error) {
      setError(error.message); // Set API error message
      console.error('Error submitting doctor data:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Static options for doctor names and job locations
  const doctorNames = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Richard Roe','Dr.samita chavan','Dr.shivani pawar'];
  const jobLocations = ['pune', 'kolhapur', 'sangli','hyedrabad','kolkata','solapur'];

  return (
    <div className="themebody-wrap" style={{ backgroundColor: '#f4f8fb' }}>
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Add Doctor" />
      {/* Breadcrumb End */}

      {/* Error Alert */}
      {error && <Alert variant="danger" style={{ marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</Alert>}
      {errors && Object.keys(errors).length > 0 && (
        <Alert variant="danger" style={{ marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
          {Object.keys(errors).map((key) => (
            <div key={key}>{errors[key]}</div>
          ))}
        </Alert>
      )}

      {/* Theme body start */}
      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <Card.Header style={{ backgroundColor: '#e3f2fd', borderBottom: '2px solid #d1e8e2' }}>
                  <h4 style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>Doctor Information</h4>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      {/* Doctor Name Dropdown */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Doctor Name</Form.Label>
                          <Form.Control
                            as="select"
                            name="name"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          >
                            <option value="">Select Doctor Name</option>
                            {doctorNames.map((name, index) => (
                              <option key={index} value={name}>
                                {name}
                              </option>
                            ))}
                          </Form.Control>
                          {errors.name && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.name}</div>}
                        </Form.Group>
                      </Col>

                      {/* Doctor Type */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Doctor Type</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Doctor Type"
                            name="doctor_type"
                            value={formData.doctor_type || ''}
                            onChange={(e) => setFormData({ ...formData, doctor_type: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.doctor_type && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.doctor_type}</div>}
                        </Form.Group>
                      </Col>

                      {/* Email */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.email && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.email}</div>}
                        </Form.Group>
                      </Col>

                      {/* Password */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password || ''}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.password && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.password}</div>}
                        </Form.Group>
                      </Col>

                      {/* Confirm Password */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword || ''}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.confirmPassword && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.confirmPassword}</div>}
                        </Form.Group>
                      </Col>

                      {/* Address */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formData.address || ''}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.address && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.address}</div>}
                        </Form.Group>
                      </Col>

                      {/* Job Location Dropdown */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Job Location</Form.Label>
                          <Form.Control
                            as="select"
                            name="job_location"
                            value={formData.job_location || ''}
                            onChange={(e) => setFormData({ ...formData, job_location: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          >
                            <option value="">Select Job Location</option>
                            {jobLocations.map((location, index) => (
                              <option key={index} value={location}>
                                {location}
                              </option>
                            ))}
                          </Form.Control>
                          {errors.job_location && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.job_location}</div>}
                        </Form.Group>
                      </Col>

                      {/* Phone */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Phone"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.phone && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.phone}</div>}
                        </Form.Group>
                      </Col>

                      {/* Department ID */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Department ID</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Department ID"
                            name="department_id"
                            value={formData.department_id || ''}
                            onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.department_id && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.department_id}</div>}
                        </Form.Group>
                      </Col>

                      {/* Profile */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Profile URL</Form.Label>
                          <Form.Control
                            type="url"
                            placeholder="Profile URL"
                            name="profile"
                            value={formData.profile || ''}
                            onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.profile && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.profile}</div>}
                        </Form.Group>
                      </Col>

                      {/* Age */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            type="number"
                            name="age"
                            value={formData.age || ''}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          />
                          {errors.age && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.age}</div>}
                        </Form.Group>
                      </Col>

                      {/* Gender */}
                      <Col md={6}>
                        <Form.Group className="mb-20">
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender || ''}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            style={{ borderRadius: '8px', borderColor: '#b0e0e6', padding: '10px' }}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Control>
                          {errors.gender && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.gender}</div>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit" disabled={loading} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#4caf50', borderColor: '#4caf50' }}>
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button variant="danger" className="ml-2" onClick={() => window.history.back()} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#e57373', borderColor: '#e57373' }}>
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