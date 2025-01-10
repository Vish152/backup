import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Table,
  Form,
  Button,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import SimpleBar from "simplebar-react";

const PharmacyCollectionReport = () => {
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const pharmacyCollectionData = [
    { date: "2025-01-01", customer: "Jane Doe", amount: 1200 },
    { date: "2025-01-02", customer: "John Smith", amount: 800 },
    { date: "2025-01-03", customer: "Alice Brown", amount: 1500 },
  ];

  const filteredData = pharmacyCollectionData.filter((entry) => {
    const isDateValid =
      (!fromDate || new Date(entry.date) >= new Date(fromDate)) &&
      (!toDate || new Date(entry.date) <= new Date(toDate));
    return isDateValid;
  });

  const handleFindClick = () => {
    console.log(`Filtering Pharmacy collection from ${fromDate} to ${toDate}`);
    console.log("Filtered Data:", filteredData);
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="Pharmacy Collection Report" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4>Pharmacy Collection Report</h4>
                </Card.Header>
                <Card.Body>
                  {/* Filters */}
                  <Form className="mb-4">
                    <Row className="align-items-end">
                      <Col md={3}>
                        <Form.Group controlId="fromDate">
                          <Form.Label>From Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="toDate">
                          <Form.Label>To Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="primary"
                          onClick={handleFindClick}
                          className="w-100"
                        >
                          Find
                        </Button>
                      </Col>
                    </Row>
                  </Form>
<br /><br />
                  {/* Pharmacy Collection Table */}
                  <Table striped bordered hover className="mt-4">
                    <thead className="thead-light">
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Amount (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.customer}</td>
                            <td>{entry.amount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center"
                            style={{ color: "red" }}
                          >
                            No records found for the selected date range.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </SimpleBar>
    </div>
  );
};

export default PharmacyCollectionReport;