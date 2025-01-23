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
  Modal,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";

const BASE_URL = "http://192.168.90.206:5000/api"; // Update your API base URL here

export default function All_doctor() {
  const [doctors, setDoctors] = useState([]);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor data

  // Fetch doctors data
  const fetchDoctorsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/V1/admin/listDoctor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data); // Check the data structure in the console

      if (response.ok) {
        setDoctors(data.data || []);
      } else {
        console.error(
          "Error fetching doctors:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsData(); // Fetch data on component mount
  }, [fromDate, toDate]);

  // Handle opening the modal
  const handleEditDoctor = (doctor) => {
    setSelectedDoctor({ ...doctor }); // Set the doctor to edit
    setShowEditDoctorModal(true); // Show the edit doctor modal
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    if (!selectedDoctor) return;

    try {
      const response = await fetch(`${BASE_URL}/V1/admin/email`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDoctor),
      });

      if (response.ok) {
        alert("Doctor updated successfully!");
        fetchDoctorsData(); // Refresh the data
        setShowEditDoctorModal(false); // Close the modal
      } else {
        console.error("Error updating doctor:", await response.json());
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

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
    <div className="cart-action" style={{ margin: "5px" }}>
      <Link className="appoinment" to={`/add-appointment/${rowData.id}`}>
        <FeatherIcon icon="plus-square" className="w-18" />
      </Link>
      <Button
        variant="btn"
        onClick={() => handleEditDoctor(rowData)}
        className="edit-btn"
      >
        <FeatherIcon icon="edit" className="w-18" />
      </Button>
    </div>
  );

  // Header content with search and refresh button
  const renderHeader = () => (
    <div className="d-flex justify-content-between align-items-center">
      {/* Left Section */}
      <div className="d-flex align-items-center" style={{ gap: "30px" }}>
        <Form.Group className="d-flex align-items-center pe-3 mb-0">
          <InputGroup>
            <Form.Control
              type="search"
              value={filters1.global.value || ""}
              onChange={(e) =>
                setFilters1({
                  global: {
                    value: e.target.value,
                    matchMode: FilterMatchMode.CONTAINS,
                  },
                })
              }
              placeholder="Global Search"
            />
          </InputGroup>
        </Form.Group>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center" style={{ gap: "15px" }}>
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
        <Button variant="primary" onClick={fetchDoctorsData}>
          Refresh Data
        </Button>
      </div>
    </div>
  );

  const header = renderHeader();

  return (
    <div className="themebody-wrap">
      <Modal
        show={showEditDoctorModal}
        onHide={() => setShowEditDoctorModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formDoctorName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDoctor?.name || ""}
                    placeholder="Enter Name"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDoctorType">
                  <Form.Label>Doctor Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDoctor?.doctor_type || ""}
                    placeholder="Enter Doctor Type"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        doctor_type: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formDoctorEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={selectedDoctor?.email || ""}
                    placeholder="Enter Email"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDoctorPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={selectedDoctor?.password || ""}
                    placeholder="Enter Password"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDoctorPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDoctor?.phone || ""}
                    placeholder="Enter Phone"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        phone: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formDoctorAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDoctor?.address || ""}
                    placeholder="Enter Address"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        address: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDoctorJobLocation">
                  <Form.Label>Job Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDoctor?.job_location || ""}
                    placeholder="Enter Job Location"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        job_location: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDoctorDepartmentID">
                  <Form.Label>Department ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDoctor?.department_id || ""}
                    placeholder="Enter Department ID"
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        department_id: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditDoctorModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Breadcrumb */}
      <PageBreadcrumb pagename="All Doctors" />

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
                      value={doctors}
                      paginator
                      rows={10}
                      header={header}
                      filters={filters1}
                      globalFilterFields={[
                        "name",
                        "doctor_type",
                        "email",
                        "password",
                        "phone",
                        "address",
                        "job_location",
                        "department_id",
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
                        field="doctor_type"
                        header="Doctor Type"
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
                        field="password"
                        header="Password"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="address"
                        header="Address"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="job_location"
                        header="Job Location"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="phone"
                        header="Phone"
                        sortable
                        style={{
                          border: "1px solid #dee2e6",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="department_id"
                        header="Department ID"
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
