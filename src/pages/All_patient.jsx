import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import FeatherIcon from "feather-icons-react";

import { Link } from "react-router-dom";
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

import PageBreadcrumb from "/Medflex/medflex/src/componets/PageBreadcrumb";

const BASE_URL = "http://192.168.1.139:5000/api"; // Update your API base URL here

export default function All_patient() {
  const [patients, setPatients] = useState([]);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(false); // Loading state
  
  // Fetch patients data
  const fetchPatientsData = async () => {
    setLoading(true); // Show loader
    try {
      const response = await fetch(`${BASE_URL}/V1/patient/listPatient`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Fetched Data:", data.data); // Debugging: Log the fetched data
        setPatients(data.data || []); // Update state with fetched patients data
      } else {
        console.error(
          "Error fetching patients:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    fetchPatientsData(); // Fetch data on component mount
  }, []);


  // Status template for the DataTable
  const statusBodyTemplate = (rowData) => (
    <span
      className={`badge ${
        rowData.status
          ? `status-${rowData.status.toLowerCase()}`
          : "status-unknown"
      }`}
    >
      {rowData.status || "Unknown"}
    </span>
  );

  // Actions template for the DataTable
  const actionBodyTemplate = (rowData) => (
    <div className="cart-action" style={{ "margin": "5px" }}>
      <Link className="appoinment" to={`/add-appointment/${rowData.id}`}>
        <FeatherIcon icon="plus-square" className="w-18" />
      </Link>
      <Link className="edit" to={`/edit-patient/${rowData.id}`}>
        <FeatherIcon icon="edit" className="w-18" />
      </Link>
      <Link className="print" to="">
        <FeatherIcon icon="printer" className="w-18" />
      </Link>
    </div>
  );

  // Global filter handler
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters1({
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  // Header content with search and refresh button
  const renderHeader = () => (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <Button variant="primary" onClick={fetchPatientsData}>
          Refresh Data
        </Button>
      </div>
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="pe-3 mb-0">Search</Form.Label>
        <InputGroup>
          <Form.Control
            type="search"
            value={filters1.global.value || ""}
            onChange={onGlobalFilterChange}
            placeholder="Global Search"
          />
        </InputGroup>
      </Form.Group>
    </div>
  );

  const header = renderHeader();

  return (
    <div className="themebody-wrap">
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="All Patients" />

      {/* Theme body */}
      <div className="theme-body">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  {loading ? ( // Show loader if data is being fetched
                    <div className="d-flex justify-content-center py-5">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <DataTable
                      value={patients}
                      paginator
                      rows={10}
                      header={header}
                        globalFilterFields={[
                        "uid",
                        "name",
                        "age",
                        "gender",
                        "phone",
                        "email",
                        "status",
                      ]}
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                      responsiveLayout="scroll"
                      className="p-datatable-customers"
                      style={{
                        borderCollapse: "collapse", // Ensure consistent borders
                        width: "100%",
                      }}
                      >
                        <Column
                          field="uid"
                          header="UID"
                          sortable
                          style={{
                            border: "1px solid #dee2e5",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                      <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="age"
                        header="Age"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="gender"
                        header="Gender"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="phone"
                        header="Phone No"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="email"
                        header="Email"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        header="Status"
                        body={statusBodyTemplate}
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        header="Actions"
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{
                          border: "1px solid #dee2e6",
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
