import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Add_lab_test() {
  const [Labdata, setLabdata] = useState([]);
  const [formData, setFormData] = useState({
    testName: "",
    shortCode: "",
    testAmount: "",
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
    alert("Lab Test Added successfully!");
    setLabdata([...Labdata, { formData }]);
    console.log(Labdata);
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Add Lab Test" />
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
                          <Form.Label>Test Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Consultation Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-20">
                          <Form.Label>Short Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Short Code"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-20">
                          <Form.Label>Test Amount</Form.Label>
                          <Form.Control
                            type="number"
                            name="name"
                            placeholder="Test Amount"
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
