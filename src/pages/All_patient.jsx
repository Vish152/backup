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

const BASE_URL = "http://192.168.90.135:5000/api"; // Update your API base URL here

export default function All_patient() {
  const [patients, setPatients] = useState([]);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(false); // Loading state
  function formatDate(date) {
    const year = date.getFullYear(); // Get the full year (e.g., 2025)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1 and pad with 0 if needed
    const day = String(date.getDate()).padStart(2, "0"); // Pad day with 0 if needed

    return `${year}-${month}-${day}`; // Combine into yyyy-mm-dd format
  }
  const [fromDate, setFromDate] = useState(formatDate(new Date()));
  const [toDate, setToDate] = useState(formatDate(new Date()));
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showEditPatientModal, setShowEditPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // Selected patient data
  
  function dateISO(dateInput) {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      console.error("Invalid date", dateInput);
      return null; // or handle it appropriately
    }

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();

    // Return in dd/mm/yyyy format
    return `${day}/${month}/${year}`;
  }




  // Function to format date to yyyy-MM-dd
  const formatToApiDate = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`; // Return formatted date as yyyy-MM-dd
  };

  // Fetch patients data
  const fetchPatientsData = async () => {
    setLoading(true);
    try {
      const url = new URL(`${BASE_URL}/V1/patient/listPatient`);
      const params = {
        from: formatToApiDate(fromDate), // Format the from date
        to: formatToApiDate(toDate), // Format the to date
      };

      // Add parameters to URL
      Object.keys(params).forEach((key) => {
        if (params[key]) url.searchParams.append(key, params[key]);
      });

      console.log("Request URL:", url.toString()); // Check the final request URL

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Fetched Data:", data.data);
        setPatients(data.data || []);
      } else {
        console.error(
          "Error fetching patients:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientsData(); // Fetch data on component mount
  }, []);

  // Handle opening the modal

const handleEditPatient = (patient) => {
  setSelectedPatient({ ...patient ,    date: dateISO(patient.date),}); // Create a copy to avoid direct state mutation
  setShowEditPatientModal(true);
};

 const handleSaveChanges = async () => {
  if (!selectedPatient) return;

  // Prepare the patient data for update
  const updatedPatientData = {
    title: selectedPatient.title || "",
    date: dateISO(selectedPatient.date),
    uid: selectedPatient.uid || "",
    name: selectedPatient.name || "",
    sex: selectedPatient.sex || "",
    phone: selectedPatient.phone || "",
    alternateNo: selectedPatient.alternateNo || "",
    email: selectedPatient.email || "",
    status: selectedPatient.status || "",
    address: selectedPatient.address || "",
    age: selectedPatient.age || "",
    blood_group: selectedPatient.blood_group || "",
    weight: selectedPatient.weight || "",
    height: selectedPatient.height || "",
    patientHistory: selectedPatient.patientHistory || "",
  };

  try {
    const response = await fetch(
      `${BASE_URL}/V1/patient/${selectedPatient.phone}`, 
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPatientData)
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      // Update patients array with the updated patient
      setPatients(prevPatients => 
        prevPatients.map((patient) =>
          patient.phone === selectedPatient.phone ? responseData.data : patient
        )
      );

      setShowEditPatientModal(false);
      setSelectedPatient(null);
    } else {
      console.error("Update failed:", responseData.message);
      alert(responseData.message || "Failed to update patient");
    }
  } catch (error) {
    console.error("Error updating patient:", error);
    alert("Network error. Please try again.");
  }
};
  // Status template for the DataTable
  const statusBodyTemplate = (rowData) => (
    <span
      className={`badge ${
        rowData.status
          ? ` status- ${rowData.status.toLowerCase()}`
          : "status-unknown"
      }`}
    >
      {rowData.status || "Unknown"}
    </span>
  );

  // Actions template for the DataTable
  const actionBodyTemplate = (rowData) => (
    <div
      className="cart-action"
      style={{ margin: "5px", display: "flex", gap: "5px" }}
    >
      <Link
        className="print"
        to=""
        style={{
          width: "35px", // Slightly reduce the width
          height: "35px", // Slightly reduce the height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%", // Circular shape
          padding: "0", // Remove default padding
        }}
        title="Print" // Tooltip text on hover
      >
        <FeatherIcon icon="printer" className="w-18" />
      </Link>
      <Link
        className="appointment"
        to={`/add-appointment/`}
        style={{
          width: "35px", // Slightly reduce the width
          height: "35px", // Slightly reduce the height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%", // Circular shape
          padding: "0", // Remove default padding
          textAlign: "center", // Center the icon
        }}
        title="Add Appointment" // Tooltip text on hover
      >
        <FeatherIcon icon="plus-square" className="w-18" />
      </Link>
      <Button
        variant="btn"
        onClick={() => handleEditPatient(rowData)}
        className="edit-btn"
        style={{
          width: "35px", // Slightly reduce the width
          height: "35px", // Slightly reduce the height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%", // Circular shape
          padding: "0", // Remove default padding
        }}
        title="Edit Patient" // Tooltip text on hover
      >
        <FeatherIcon icon="edit" className="w-18" />
      </Button>
    </div>
  );

  // Header content with search and refresh button
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
      <div className="d-flex align-items-center" style={{ gap: "30px" }}>
        <Form.Group className="d-flex align-items-center pe-3 mb-0">
          {/* <Form.Label>Search</Form.Label> */}
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
        <Button variant="primary" onClick={fetchPatientsData}>
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
      <Modal
        show={showEditPatientModal}
        onHide={() => setShowEditPatientModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formPatientTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.title || ""}
                    placeholder="Enter Title"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        title: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.date || ""}
                    placeholder="dd-mm-yyyy"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        date: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientUid">
                  <Form.Label>UID</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.uid || ""}
                    readOnly
                    style={{
                      backgroundColor: "#e9ecef", // Light grey background to indicate read-only
                      color: "#6c757d", // Grey text color
                      cursor: "not-allowed", // Show "not-allowed" cursor
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formPatientName">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.name || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.sex || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        sex: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientPhone">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedPatient?.phone || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        phone: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientPhone">
                  <Form.Label>Alternate No</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedPatient?.alternateNo || ""}
                    placeholder="Enter Alternate Number"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        alternateNo: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={selectedPatient?.email || ""}
                    placeholder="Enter Email"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.status || ""}
                    // placeholder="Enter Status"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        status: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.address || ""}
                    placeholder="Enter Address"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        address: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.age || ""}
                    placeholder="Enter Age"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        age: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formPatientBloodGroup">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.blood_group || ""}
                    placeholder="Enter Blood Group"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        blood_group: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientPatientWeight">
                  <Form.Label>Patient Weight</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.weight || ""}
                    placeholder="Enter Patient Weight"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        weight: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientPatientHeight">
                  <Form.Label>Patient Height</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedPatient?.height || ""}
                    placeholder="Enter Patient Height"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        height: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPatientPatientHistory">
                  <Form.Label>Patient History</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPatient?.patientHistory || ""}
                    placeholder="Enter Patient History"
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        patientHistory: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Add additional fields for editing */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEditPatientModal(false);
              setSelectedPatient(null);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Breadcrumb */}
      <PageBreadcrumb pagename="All Patients" />

      {/* Theme body */}
      <div
        className="theme-body"
        style={{
          padding: "20px",
          background: "linear-gradient(to right, #e0f7fa, #80deea)",
          fontFamily: "'Poppins', Arial, sans-serif",
          minHeight: "100vh",
        }}
      >
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
                  {loading ? ( // Show loader if data is being fetched
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
                      value={patients}
                      paginator
                      rows={10}
                      filters={filters1}
                      header={header}
                      globalFilterFields={[
                        "uid",
                        "name",
                        "date",
                        "age",
                        "sex",
                        "phone",
                        "email",
                        "status",
                      ]}
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
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
                        field="uid"
                        header="UID"
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
                        field="name"
                        header="Name"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="age"
                        header="Age"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="sex"
                        header="Gender"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="phone"
                        header="Phone No"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="email"
                        header="Email"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        header="Status"
                        body={statusBodyTemplate}
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        header="Actions"
                        body={actionBodyTemplate}
                        exportable={false}
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