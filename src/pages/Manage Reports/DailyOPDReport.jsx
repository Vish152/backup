import React from "react";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import { Row, Col, Card, Container, Table, Button } from "react-bootstrap";

const reportData = {
  opdCounts: [
    { type: "New", count: 0 },
    { type: "Follow UP", count: 0 },
    { type: "PO", count: 0 },
    { type: "PROCTOSCOPY", count: 0 },
    { type: "TOTAL", count: 0 },
  ],
  opdDetails: [
    { type: "DNC", new: 0, followUp: 0, po: 0, total: 0 },
    { type: "DNP", new: 0, followUp: 0, po: 0, total: 0 },
    { type: "DNW", new: 0, followUp: 0, po: 0, total: 0 },
    { type: "DNT", new: 0, followUp: 0, po: 0, total: 0 },
    { type: "WALK IN", new: 0, followUp: 0, po: 0, total: 0 },
  ],
  collectionDetails: [
    { method: "Cash", amount: 0 },
    { method: "Card", amount: 0 },
    { method: "Online", amount: 0 },
    { method: "Paytm", amount: 0 },
    { method: "TOTAL", amount: 0 },
  ],
  testDetails: [{ testName: "Test A", amount: 0 }],
};

const DailyOPDReport = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="themebody-wrap"
      style={{
        padding: "20px",
        backgroundColor: "#e0f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <PageBreadcrumb pagename="Daily OPD Report" />
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card
              className="shadow-sm"
              style={{
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderColor: "#90caf9",
              }}
            >
              <Card.Header
                className="text-center"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#01579b",
                  backgroundColor: "#e3f2fd",
                  borderBottom: "2px solid #0288d1",
                  padding: "1rem",
                }}
              >
                DAILY OPD REPORT 20-01-2025
              </Card.Header>
              <Card.Body style={{ padding: "25px" }}>
                {/* OPD Counts */}
                <Table
                  bordered
                  responsive
                  className="table-striped mb-4"
                  style={{
                    border: "1px solid #90caf9",
                    textAlign: "center",
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#0288d1",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    <tr>
                      <th>Type</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.opdCounts.map((item, index) => (
                      <tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
<br />
                {/* OPD Details */}
                <Table
                  bordered
                  responsive
                  className="table-striped mb-4"
                  style={{
                    border: "1px solid #90caf9",
                    textAlign: "center",
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#0288d1",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    <tr>
                      <th>Type</th>
                      <th>New</th>
                      <th>Follow UP</th>
                      <th>PO</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.opdDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.new}</td>
                        <td>{item.followUp}</td>
                        <td>{item.po}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
<br />
                {/* Test Details */}
                <Table
                  bordered
                  responsive
                  className="table-striped mb-4"
                  style={{
                    border: "1px solid #90caf9",
                    textAlign: "center",
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#0288d1",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    <tr>
                      <th>Test</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.testDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.testName}</td>
                        <td>{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
<br />
                {/* Collection Details */}
                <Table
                  bordered
                  responsive
                  className="table-striped"
                  style={{
                    border: "1px solid #90caf9",
                    textAlign: "center",
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#0288d1",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    <tr>
                      <th colSpan="2">Overall Collection Detail (Rs)</th>
                    </tr>
                    <tr>
                      <th>Method</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.collectionDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.method}</td>
                        <td>{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>

              <Card.Footer
                className="text-center"
                style={{
                  padding: "1rem",
                  borderTop: "2px solid #0288d1",
                }}
              >
                <Button
                  variant="primary"
                  style={{border: "none" }}
                  onClick={handlePrint}
                >
                  Print Report
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DailyOPDReport;
