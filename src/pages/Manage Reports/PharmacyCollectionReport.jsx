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
    <div
      className="themebody-wrap"
      style={{
        padding: "20px",
        background: "linear-gradient(to right, #e0f7fa, #80deea)",
        fontFamily: "'Poppins', Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="Pharmacy Collection Report" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                  borderColor: "#00bcd4",
                  background: "white",
                }}
              >
                <Card.Header
                  className="text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#006064",
                    background: "linear-gradient(to right, #4dd0e1, #00acc1)",
                    borderBottom: "3px solid #00bcd4",
                    padding: "1rem",
                    backgroundColor: "white",
                  }}
                >
                  <h4>Pharmacy Collection Report</h4>
                </Card.Header>
                <Card.Body>
                  {/* Filters */}
                  <Form className="mb-4">
                    <Row className="align-items-end">
                      <Col md={3}>
                        <Form.Group controlId="fromDate">
                          <Form.Label
                            style={{ fontWeight: "bold", color: "#006064" }}
                          >
                            From Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            style={{
                              border: "2px solid #4dd0e1",
                              textAlign: "center",
                              borderRadius: "8px",
                              padding: "10px",
                              backgroundColor: "#e0f7fa",
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="toDate">
                          <Form.Label
                            style={{ fontWeight: "bold", color: "#006064" }}
                          >
                            To Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            style={{
                              border: "2px solid #4dd0e1",
                              textAlign: "center",
                              borderRadius: "8px",
                              padding: "10px",
                              backgroundColor: "#e0f7fa",
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="primary"
                          onClick={handleFindClick}
                          className="w-100"
                          style={{
                            marginTop: "20px",
                            height: "40px",
                            width: "100px",
                            backgroundColor: "#00acc1",
                            borderColor: "#00bcd4",
                            color: "white",
                            cursor: "pointer",
                            borderRadius: "8px",
                            transition: "0.3s all",
                            fontWeight: "bold",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#007c91";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#00acc1";
                          }}
                        >
                          Find
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <br />
                  <br />
                  {/* Pharmacy Collection Table */}
                  <Table
                    striped
                    bordered
                    hover
                    className="mt-4"
                    style={{
                      border: "1px solid #4dd0e1",
                      marginTop: "20px",
                      width: "100%",
                      background: "white",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <thead
                      className="thead-light"
                      style={{
                        background:
                          "linear-gradient(to right, #00acc1, #007c91)",
                        color: "white",
                        fontSize: "16px",
                      }}
                    >
                      <tr>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Customer</th>
                        <th style={{ textAlign: "center" }}>Amount (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                backgroundColor:
                                  index % 2 === 0 ? "#e0f7fa" : "white",
                                transition: "background-color 0.3s ease",
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#b2ebf2";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor =
                                  index % 2 === 0 ? "#e0f7fa" : "white";
                              }}
                            >
                              {entry.date}
                            </td>
                            <td
                              style={{ padding: "10px", textAlign: "center" }}
                            >
                              {entry.customer}
                            </td>
                            <td
                              style={{ padding: "10px", textAlign: "center" }}
                            >
                              {entry.amount}
                            </td>
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
