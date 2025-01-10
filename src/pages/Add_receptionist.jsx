import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Add_receptionist() {
  const [Doctordata, setDoctordata] = useState([]);
  const [formData, setFormData] = useState({
    ReceptionistName: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    alert("Receptionist saved successfully!");
    setDoctordata([...Doctordata, { formData }]);
    console.log(Doctordata);
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Add Receptionist" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Receptionist Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Receptionist Name"
                            name="Receptionist Name"
                            value={formData.ReceptionistName}
                            onChange={handleInputChange}
                          />
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
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-20">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
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

                      <Col>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
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
          </Row>
        </Container>
      </SimpleBar>
      {/* theme body end */}
    </div>
  );
}
