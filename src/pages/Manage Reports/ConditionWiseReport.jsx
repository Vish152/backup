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
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import SimpleBar from "simplebar-react";

const ConditionWiseReport = () => {
  // State for form inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Placeholder data for the condition-wise report
  const conditionWiseReportData = [
    {
      date: "2025-01-01",
      condition: "Diabetes",
      patients: 15,
      totalEarnings: 5000,
    },
  ];

  // Filter data based on selected dates
  const filteredData = conditionWiseReportData.filter((entry) => {
    const isDateValid =
      (!fromDate || new Date(entry.date) >= new Date(fromDate)) &&
      (!toDate || new Date(entry.date) <= new Date(toDate));
    return isDateValid;
  });

  // Handle Find button click
  const handleFindClick = () => {
    console.log(
      `Filtering condition-wise report from ${fromDate} to ${toDate}`
    );
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="Condition Wise Report" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4>Condition Wise Report</h4>
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
                  <br />
                  <br />
                  {/* Condition Wise Report Table */}
                  <Table striped bordered hover className="mt-4">
                    <thead className="thead-light">
                      <tr>
                        <th>Date</th>
                        <th>Condition</th>
                        <th>Patients</th>
                        <th>Total Earnings (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.condition}</td>
                            <td>{entry.patients}</td>
                            <td>{entry.totalEarnings}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
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

export default ConditionWiseReport;
