import React from "react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import { Row, Col, Card, Container, Table, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";

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
    <div className="themebody-wrap">
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="Daily OPD Report" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4>Daily OPD Report - 02-01-2025</h4>
                </Card.Header>
                <Card.Body>
                  {/* OPD Counts */}
                  <h5>OPD Counts</h5>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
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

                  {/* OPD Details */}
                  <h5>OPD Details</h5>
                  <Table bordered responsive>
                    <thead>
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
                  <h5>Test Details</h5>
                  <Table bordered responsive>
                    <thead>
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
                  <h5>Overall Collection Details (Rs)</h5>
                  <Table bordered responsive>
                    <thead>
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
                <Card.Footer className="text-center">
                  <Button variant="primary" onClick={handlePrint}>
                    Print Report
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </SimpleBar>
    </div>
  );
};

export default DailyOPDReport;
