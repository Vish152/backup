import React, { useState } from "react";
import PageBreadcrumb from "../../../componets/PageBreadcrumb";
import { Row, Col, Card, Form, Container } from "react-bootstrap";
import SimpleBar from "simplebar-react";

const BillingReport = () => {
  // State for form inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Placeholder data for the Billing Report
  const billingReport = [
    { date: "2025-01-01", patient: "John Doe", amount: 5000, status: "Paid" },
    {
      date: "2025-01-03",
      patient: "Jane Smith",
      amount: 3000,
      status: "Pending",
    },
    {
      date: "2025-01-05",
      patient: "Bob Williams",
      amount: 7000,
      status: "Paid",
    },
  ];

  // Filter data based on selected dates
  const filteredData = billingReport.filter((entry) => {
    const isDateValid =
      (!fromDate || new Date(entry.date) >= new Date(fromDate)) &&
      (!toDate || new Date(entry.date) <= new Date(toDate));
    return isDateValid;
  });

  // Handle Find button click
  const handleFindClick = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log(`Filtering Billing Report from ${fromDate} to ${toDate}`);
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb start */}
      <PageBreadcrumb pagename="Billing Report" />
      {/* Breadcrumb end */}

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                style={{
                  width: "100%", // Allow card to take full width
                  marginTop: "0px",
                  margin: "0px",
                  marginRight: "10px",
                  minHeight: "70vh",
                }}>
                <Card.Header>
                  <h4>Billing Report</h4>
                </Card.Header>

                <Card.Body>
                  <Form onSubmit={handleFindClick}>
                    <Row>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>From Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>To Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <button className="btn btn-primary" type="submit" style={{"marginTop":"20px", "height":"40px", "width":"70px"}}>
                            Find
                          </button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>

                <Card.Body>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>Amount (Rs)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.patient}</td>
                            <td>{entry.amount}</td>
                            <td>{entry.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No records found for the selected date range.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </SimpleBar>
    </div>
  );
};

export default BillingReport;