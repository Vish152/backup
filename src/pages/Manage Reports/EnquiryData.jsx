import React, { useState } from "react";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import {
  Row,
  Col,
  Card,
  Container,
  Table,
  Form,
  Button,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";

const EnquiryData = () => {
  // State for form inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Placeholder data for enquiry data (can be replaced with real API data)
  const enquiryData = [
    {
      date: "2025-01-01",
      customer: "John Smith",
      enquiryType: "Service Inquiry",
    },
    {
      date: "2025-01-03",
      customer: "Jane Doe",
      enquiryType: "Product Inquiry",
    },
  ];

  // Filter data based on selected dates
  const filteredData = enquiryData.filter((entry) => {
    const isDateValid =
      (!fromDate || new Date(entry.date) >= new Date(fromDate)) &&
      (!toDate || new Date(entry.date) <= new Date(toDate));
    return isDateValid;
  });

  // Handle Find button click
  const handleFindClick = () => {
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      console.error(
        "Invalid date range: From Date should not be after To Date."
      );
      return;
    }
    console.log(`Filtering enquiry data from ${fromDate} to ${toDate}`);
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
      <PageBreadcrumb pagename="Enquiry Data Report" />

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
                  <h4>Enquiry Data Report</h4>
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

                  {/* Enquiry Data Table */}
                  <Table
                    bordered
                    responsive
                    className="table table-bordered"
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
                        <th style={{ textAlign: "center" }}>Enquiry Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                          <tr key={index}
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
                            <td
                            style={{ padding: "10px", textAlign: "center" }}
                            >{entry.date}</td>
                            <td
                            style={{ padding: "10px", textAlign: "center" }}
                            >{entry.customer}</td>
                            <td
                            style={{ padding: "10px", textAlign: "center" }}
                            >{entry.enquiryType}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center"
                          style={{ textAlign: "center", padding: "10px" }}
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

export default EnquiryData;
