import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Add_company_details() {
  const [Companydata, setCompanydata] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    comapanyType: "",
    phoneNo: "",
    emailId: "",
    address: "",
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
    alert("Company Details Added successfully!");
    setCompanydata([...Companydata, { formData }]);
    console.log(Companydata);
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Add Company Details" />
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
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Company Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Company Type</Form.Label>
                          <select
                            className="form-select"
                            name="CompanyType"
                            value={formData.CompanyType}
                            onChange={handleInputChange}
                          >
                            <option value="company type">
                              Select company type
                            </option>
                            <option value="Insurance company">
                              Insurance Company
                            </option>
                            <option value="TPA">TPA</option>
                          </select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Phone No</Form.Label>
                          <Form.Control
                            type="number"
                            name="name"
                            placeholder="Phone No"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Email Id</Form.Label>
                          <Form.Control
                            type="email"
                            name="name"
                            placeholder="Email Id"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-20">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Address"
                            value={formData.name}
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
