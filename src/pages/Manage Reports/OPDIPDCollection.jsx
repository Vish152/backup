import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import SimpleBar from "simplebar-react";

const OPDCollectionReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const collectionData = [
    {
      id: 1,
      receiptDate: "2025-01-07",
      opdCash: 0,
      ipdCash: 0,
      opdCard: 0,
      ipdCard: 0,
      opdCheque: 0,
      ipdCheque: 0,
      opdOnline: 0,
      ipdOnline: 0,
    },
  ];

  const filteredData = collectionData.filter((data) => {
    return (
      (!fromDate || new Date(data.receiptDate) >= new Date(fromDate)) &&
      (!toDate || new Date(data.receiptDate) <= new Date(toDate))
    );
  });

  const totals = filteredData.reduce(
    (acc, curr) => {
      acc.opdCash += curr.opdCash;
      acc.ipdCash += curr.ipdCash;
      acc.opdCard += curr.opdCard;
      acc.ipdCard += curr.ipdCard;
      acc.opdCheque += curr.opdCheque;
      acc.ipdCheque += curr.ipdCheque;
      acc.opdOnline += curr.opdOnline;
      acc.ipdOnline += curr.ipdOnline;
      return acc;
    },
    {
      opdCash: 0,
      ipdCash: 0,
      opdCard: 0,
      ipdCard: 0,
      opdCheque: 0,
      ipdCheque: 0,
      opdOnline: 0,
      ipdOnline: 0,
    }
  );

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="OPD+IPD Collection" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h4>OPD+IPD COLLECTION</h4>
                </Card.Header>
                <Card.Body>
                  {/* Filter Section */}
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
                          onClick={() => {}}
                          className="w-100"
                        >
                          Find
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <br />
                  <br />
                  {/* Collection Data Table */}
                  <Table striped bordered hover responsive className="mt-4">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Receipt Date</th>
                        <th>OPD Cash</th>
                        <th>IPD Cash</th>
                        <th>OPD Card</th>
                        <th>IPD Card</th>
                        <th>OPD Cheque</th>
                        <th>IPD Cheque</th>
                        <th>OPD Online</th>
                        <th>IPD Online</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((data, index) => (
                        <tr key={data.id}>
                          <td>{index + 1}</td>
                          <td>{data.receiptDate}</td>
                          <td>{data.opdCash}</td>
                          <td>{data.ipdCash}</td>
                          <td>{data.opdCard}</td>
                          <td>{data.ipdCard}</td>
                          <td>{data.opdCheque}</td>
                          <td>{data.ipdCheque}</td>
                          <td>{data.opdOnline}</td>
                          <td>{data.ipdOnline}</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td colSpan="2">
                          <strong>Total</strong>
                        </td>
                        <td>{totals.opdCash}</td>
                        <td>{totals.ipdCash}</td>
                        <td>{totals.opdCard}</td>
                        <td>{totals.ipdCard}</td>
                        <td>{totals.opdCheque}</td>
                        <td>{totals.ipdCheque}</td>
                        <td>{totals.opdOnline}</td>
                        <td>{totals.ipdOnline}</td>
                      </tr>
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

export default OPDCollectionReport;
