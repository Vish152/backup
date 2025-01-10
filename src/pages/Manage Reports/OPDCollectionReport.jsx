import React, { useState } from "react";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import { Row, Col, Card,   Container,
  Table,
  Form,
  Button,
} from 'react-bootstrap';
import SimpleBar from "simplebar-react";

const OPDCollectionReport = () => {
  // State for form inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Placeholder data for OPD collection (can be replaced with real API data)
  const opdCollectionData = [
    { date: "2025-01-01", patient: "John Doe", amount: 500 },
    { date: "2025-01-03", patient: "Jane Smith", amount: 700 },
  ];

  // Filter data based on selected dates
  const filteredData = opdCollectionData.filter((entry) => {
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
    console.log(`Filtering OPD collection from ${fromDate} to ${toDate}`);
  };

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="OPD Collection Report" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
          <h4>OPD Collection Report</h4>
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
          {/* OPD Collection Table */}
          <table className="table table-bordered mt-4">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Amount (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.patient}</td>
                    <td>{entry.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
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

export default OPDCollectionReport;