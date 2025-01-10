import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Form, FormGroup, Button, Row, Col } from "react-bootstrap"; // Make sure to install react-bootstrap

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OPDIPDCollGraph = () => {
  // State for form inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Placeholder data for OPD+IPD collections (can be replaced with real API data)
  const collectionData = [
    { date: "2025-01-01", opdCash: 1000, ipdCash: 1200 },
    { date: "2025-01-02", opdCash: 1100, ipdCash: 1300 },
    { date: "2025-01-03", opdCash: 1200, ipdCash: 1400 },
    { date: "2025-01-04", opdCash: 1300, ipdCash: 1500 },
  ];

  // Filter data based on selected dates
  const filteredData = collectionData.filter((entry) => {
    return (
      (!fromDate || new Date(entry.date) >= new Date(fromDate)) &&
      (!toDate || new Date(entry.date) <= new Date(toDate))
    );
  });

  // Data for the chart (based on filtered data)
  const chartData = {
    labels: filteredData.map((entry) => entry.date),
    datasets: [
      {
        label: "OPD Cash",
        data: filteredData.map((entry) => entry.opdCash),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        label: "IPD Cash",
        data: filteredData.map((entry) => entry.ipdCash),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
      },
    ],
  };

  // Handle Find button click
  const handleFindClick = () => {
    console.log(`Filtering collection data from ${fromDate} to ${toDate}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Card.Body>
          <Card.Title
            style={{
              textAlign: "center",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            OPD+IPD Collection Graph
          </Card.Title>

          {/* Form for date range */}
          <Form>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Form.Label>From Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Form.Label>To Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col
                md={3}
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <Button
                  onClick={handleFindClick}
                  style={{
                    width: "100%",
                    backgroundColor: "#4caf50",
                    borderColor: "#4caf50",
                    color: "white",
                  }}
                >
                  Find
                </Button>
              </Col>
            </Row>
          </Form>

          <br />

          {/* Chart Section */}
          <Row>
            <Col xs={12}>
              <div
                style={{ width: "100%", height: "400px", marginTop: "20px" }}
              >
                <Line data={chartData} />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OPDIPDCollGraph;