import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";

const BASE_URL = "http://192.168.90.147:5000/api";

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch enquiries data
  const fetchEnquiriesData = async (withFilters = false) => {
    setLoading(true);
    try {
      const url = new URL(`${BASE_URL}/V1/enquiry/listEnquiry`);
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

      if (withFilters && fromDate && toDate) {
        const params = {
          from: fromDate.split("-").reverse().join("/"),
          to: toDate.split("-").reverse().join("/"),
        };
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
      } else {
        // Default filter for current date
        const params = {
          from: today.split("-").reverse().join("/"),
          to: today.split("-").reverse().join("/"),
        };
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        const result = Array.isArray(data.data) ? data.data : [];
        setEnquiries(result);
        setFilteredEnquiries(result); // Initialize filtered data
      } else {
        console.error(
          "Error fetching enquiries:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load default data on component mount
  useEffect(() => {
    fetchEnquiriesData(); // Fetch data for current date by default
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = enquiries.filter((enquiry) =>
      Object.values(enquiry).some(
        (field) =>
          typeof field === "string" &&
          field.toLowerCase().includes(value)
      )
    );

    setFilteredEnquiries(filteredData); // Update filtered data
  };

  const renderHeader = () => (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{
        border: "2px solid #4dd0e1",
        textAlign: "center",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#e0f7fa",
        fontWeight: "bold",
        color: "#006064",
      }}
    >
      {/* Left Section */}
      <div className="d-flex align-items-center">
        <Form.Group
          className="d-flex align-items-center pe-3 mb-0"
          style={{ gap: "30px" }}
        >
          {/* <Form.Label>Search</Form.Label> */}
          <InputGroup>
            <Form.Control
              type="search"
              value={searchTerm}
              onChange={handleSearchChange} // Handle live search
              placeholder="Global Search"
            />
          </InputGroup>
        </Form.Group>
      </div>

      {/* Right Section */}
      <div
        className="d-flex align-items-center"
        style={{
          gap: "15px",
          border: "2px solid #4dd0e1",
          textAlign: "center",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#e0f7fa",
        }}
      >
        <Form.Group className="pe-3 mb-0">
          From Date
          <Form.Control
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="pe-3 mb-0">
          To Date
          <Form.Control
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => fetchEnquiriesData(true)} // Fetch data with filters
        >
          Refresh Data
        </Button>
      </div>
    </div>
  );

  const header = renderHeader();

  return (
    <div
      className="themebody-wrap"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #80deea)",
        fontFamily: "'Poppins', Arial, sans-serif",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <PageBreadcrumb pagename="Enquiry List" />
      <div className="theme-body">
        <Container fluid>
          <Row>
            <Col>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                  borderColor: "#00bcd4",
                  background: "white",
                  border: "1px solid #00bcd4",
                }}
              >
                <Card.Body>
                  {loading ? (
                    <div
                      className="d-flex justify-content-center py-5"
                      style={{ color: "#00bcd4" }}
                    >
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <DataTable
                      value={filteredEnquiries} // Use filtered data
                      paginator
                      rows={10}
                      header={header}
                      responsiveLayout="scroll"
                      className="p-datatable-customers"
                      rowClassName={(rowData, { rowIndex }) => ({
                        style: {
                          backgroundColor:
                            rowIndex % 2 === 0 ? "#e0f7fa" : "white", // Alternating colors
                          transition: "background-color 0.3s ease",
                        },
                        onMouseOver: (e) => {
                          e.currentTarget.style.backgroundColor = "#b2ebf2"; // Hover effect
                        },
                        onMouseOut: (e) => {
                          e.currentTarget.style.backgroundColor =
                            rowIndex % 2 === 0 ? "#e0f7fa" : "white"; // Revert on mouse out
                        },
                      })}
                      style={{
                        border: "1px solid #4dd0e1",
                        marginTop: "20px",
                        width: "100%",
                        background: "white",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <Column
                        field="srNo"
                        header="Sr. No"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="date"
                        header="Date"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="patient_name"
                        header="Patient Name"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="patient_phone"
                        header="Contact No"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="patient_location"
                        header="Address"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="enquirytype"
                        header="Enquiry Type"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="FDE_Name"
                        header="FDE Name"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                    </DataTable>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}