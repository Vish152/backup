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
  Modal,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export const BASE_URL = "http://192.168.90.135:5000/api"; // Update your API base URL here

export default function Call_logs() {
  const [CallLogs, setCallLogs] = useState([]);
  const [formData, setFormData] = useState({
    doctor_id: "",
    doctorName: "",
  });
  const [doctors, setDoctors] = useState([]); // Doctors list
  const [fdeList, setFdeList] = useState([]); // FDE list
  const [enquiryTypes, setEnquiryTypes] = useState([]); // Store enquiry types
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(false); // Loading state

  const [showNoteModal, setShowNoteModal] = useState(false); // Modal state for showing note
  const [selectedNote, setSelectedNote] = useState(""); // Selected note content
  const [showEnquiryModal, setShowEnquiryModal] = useState(false); // Modal state for Enquiry
  const [selectedCallLog, setSelectedCallLog] = useState(null); // Selected call log for Enquiry

  function formatDate(date) {
    const year = date.getFullYear(); // Get the full year (e.g., 2025)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1 and pad with 0 if needed
    const day = String(date.getDate()).padStart(2, "0"); // Pad day with 0 if needed

    return `${year}-${month}-${day}`; // Combine into yyyy-mm-dd format
  }
  const [fromDate, setFromDate] = useState(formatDate(new Date()));
  const [toDate, setToDate] = useState(formatDate(new Date()));

  const handleAddAppointmentClick = (rowData) => {
    setFormData({
      date: rowData.call_date || "", // Populate with relevant fields
      doctorName: "", // Add doctor name if applicable
      patientName: rowData.caller_no || "", // Use caller_no for example
      mobileNumber: rowData.destination_no || "",
      appointmentTime: rowData.call_time || "",
      fdeName: "", // Add FDE name if applicable
      note: rowData.note || "",
    });
    setShowAddModal(true); // Open the modal
  };

  // State to handle the enquiry form fields
  const [enquiryForm, setEnquiryForm] = useState({
    callBackDate: "",
    enquiryType: "",
    patientName: "",
    mobileNumber: "",
    fdeName: "",
    note: "",
  });
  // Function to format date to yyyy-MM-dd
  const formatToApiDate = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`; // Return formatted date as yyyy-MM-dd
  };

  // Fetch the call logs data from API
  const fetchCallLogsData = async () => {
    setLoading(true); // Show loader

    try {
      const url = new URL(`${BASE_URL}/V1/ivrdata/listIvrdata`);
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
      console.log("API Response:", data); // Log the full response

      if (response.ok) {
        setCallLogs(data.data || []); // Ensure it's an array and update state
      } else {
        console.error(
          "Error fetching call logs:",
          data.message || "Unknown error"
        );
        setCallLogs([]); // Reset call logs on error
      }
    } catch (error) {
      console.error("Network or Server Error:", error.message);
      setCallLogs([]); // Reset call logs on error
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Call this effect whenever fromDate or toDate changes
  // useEffect(() => {
  //   fetchCallLogsData();
  // }, [fromDate, toDate]); // Dependency array ensures the effect runs when dates change

  const fetchDropdownData = async () => {
    try {
      const doctorResponse = await fetch(
        `${BASE_URL}/V1/ivrdata/doctor_dropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (doctorResponse.ok) {
        const doctorData = await doctorResponse.json();
        console.log("Doctors API Response:", doctorData); // Debug API response
        setDoctors(Array.isArray(doctorData.data) ? doctorData.data : []);
      } else {
        console.error("Failed to fetch doctors:", doctorResponse.statusText);
      }
      //   } catch (error) {
      //     console.error("Error fetching doctors:", error.message);
      //   }
      // };

      // Fetch FDE List
      const fdeResponse = await fetch(`${BASE_URL}/V1/ivrdata/fde_dropdown`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (fdeResponse.ok) {
        const fdeData = await fdeResponse.json();
        console.log("FDE API Response:", fdeData);
        setFdeList(Array.isArray(fdeData.data) ? fdeData.data : []);
      } else {
        console.error("Failed to fetch FDE list:", fdeResponse.statusText);
      }

      // Fetch Enquiry Types
      const enquiryTypeResponse = await fetch(
        `${BASE_URL}/V1/ivrdata/enquiry_dropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (enquiryTypeResponse.ok) {
        const enquiryTypeData = await enquiryTypeResponse.json();
        setEnquiryTypes(enquiryTypeData); // Update state for enquiry types
      } else {
        console.error(
          "Failed to fetch enquiry types:",
          enquiryTypeResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error.message);
    }
  };

  useEffect(() => {
    fetchCallLogsData();
    fetchDropdownData();
  }, []);

  useEffect(() => {
    console.log("Doctors State Updated:", doctors); // Log state updates
  }, [doctors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Add Appointment Submission
  const handleAddAppointment = (e) => {
    e.preventDefault();
    console.log("Submitting Appointment:", formData);

    // Add API call or logic to process the appointment data
    setShowAddModal(false); // Close the modal after submission
  };
  // Enquiry form input change handler
  const handleEnquiryInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm({
      ...enquiryForm,
      [name]: value,
    });
  };

  // Handle submitting the enquiry form
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    // You can perform further actions here, like sending the enquiry data to the server
    console.log("Enquiry Submitted:", enquiryForm);
    setShowEnquiryModal(false); // Close the modal after submission
  };

  // Enquiry modal handler
  const handleEnquiryClick = (callLog) => {
    setSelectedCallLog(callLog); // Set the selected call log for enquiry
    setShowEnquiryModal(true); // Show the enquiry modal
  };

  // Handle showing the note
  const handleNoteClick = (note) => {
    setSelectedNote(note); // Set the selected note
    setShowNoteModal(true); // Show the note modal
  };

  // Actions template for the DataTable
  const actionBodyTemplate = (rowData) => (
    <div className="cart-action" style={{ display: "flex", gap: "5px" }}>
      {" "}
      {/* Reduced gap */}
      <Button
        variant="btn"
        onClick={() => handleAddAppointmentClick(rowData)} // Pass rowData here
        className="appointment-btn"
        title="Add Appointment" // Tooltip text on hover
        style={{
          width: "35px", // Set a fixed size for consistent button sizes
          height: "35px", // Set a fixed size for consistent button sizes
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%", // Circular shape
          padding: "0", // Remove padding to keep the size uniform
        }}
      >
        <FeatherIcon icon="plus-square" className="w-18" />
      </Button>
      {/* Enquiry Button */}
      <Button
        variant="btn"
        onClick={() => handleEnquiryClick(rowData)}
        className="enquiry-btn"
        title="Enquiry" // Tooltip text on hover
        style={{
          width: "35px", // Set a fixed size for consistent button sizes
          height: "35px", // Set a fixed size for consistent button sizes
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%", // Circular shape
          padding: "0", // Remove padding to keep the size uniform
        }}
      >
        <FeatherIcon icon="message-circle" className="w-18" />
      </Button>
      <Button
        variant="btn"
        onClick={() => handleNoteClick(rowData.note)}
        className="note-btn"
        title="View Notes" // Tooltip text on hover
        style={{
          width: "35px", // Set a fixed size for consistent button sizes
          height: "35px", // Set a fixed size for consistent button sizes
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%", // Circular shape
          padding: "0", // Remove padding to keep the size uniform
        }}
      >
        <FeatherIcon icon="file-text" className="w-18" />
      </Button>
    </div>
  );

  // Header content with search and refresh button
  const renderHeader = () => (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{
        padding: "15px",
        backgroundColor: "#e0f7fa",
        borderRadius: "8px 8px 0 0",
        border: "1px solid #90caf9",
        borderBottom: "none",
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
        <Button variant="primary" onClick={fetchCallLogsData}>
          Refresh Data
        </Button>
      </div>
    </div>
  );

  const header = renderHeader();

  return (
    <>
      <div
        className="themebody-wrap"
        style={{
          backgroundColor: "#e0f7fa",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* Breadcrumb Start */}
        <PageBreadcrumb pagename="Call List" />
        {/* Breadcrumb End */}
        {/* theme body start */}
        <div className="theme-body">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Row className="Product_list">
                      <DataTable
                        value={CallLogs}
                        paginator
                        rows={10}
                        filters={filters1}
                        header={header}
                        loading={loading}
                        globalFilterFields={[
                          "ivr_id",
                          "call_date",
                          "caller_no",
                          "destination_no",
                          "call_time",
                          "call_type",
                          "call_status",
                          "call_duration",
                          "circle_name",
                          "status",
                          "note",
                          "source",
                        ]}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                        responsiveLayout="scroll"
                        className="p-datatable-customers"
                        style={{
                          borderCollapse: "collapse", // Ensure consistent borders
                          width: "100%",
                          border: "1px solid #90caf9",
                          borderRadius: "8px",
                        }}
                      >
                        <Column
                          field="ivr_id"
                          header="Sr No."
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="call_date"
                          header="Date"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="caller_no"
                          header="Phone No."
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="destination_no"
                          header="Destination Number"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="call_time"
                          header="Call Time"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="call_type"
                          header="Type"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="call_status"
                          header="Raw Type"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="call_duration"
                          header="Duration"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="circle_name"
                          header="Region"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="status"
                          header="Status"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="note"
                          header="Note"
                          sortable
                          style={{
                            border: "1px solid #90caf9",
                            textAlign: "center",
                            padding: "0.75rem",
                          }}
                        />
                        <Column
                          field="source"
                          header="Source"
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
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/* theme body end */}
      </div>

      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddAppointment}>
            <Row>
              {/* Date */}
              <Col md={6} className="mb-4">
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Doctor Name</Form.Label>
                  <Form.Select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a Doctor</option>
                    {doctors && doctors.length > 0 ? (
                      doctors.map((doctor) => (
                        <option key={doctor.doctor_id} value={doctor.doctor_id}>
                          {doctor.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No doctors available</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Appointment Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>FDE Name</Form.Label>
                  <Form.Select
                    name="fdeId"
                    value={formData.fdeId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select FDE Name</option>
                    {fdeList &&
                      fdeList.length > 0 &&
                      fdeList.map((fde) => (
                        <option key={fde.FDEID} value={fde.FDEID}>
                          {fde.FDEName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={15}>
                <Form.Group className="mb-20">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    type="text"
                    name="note"
                    placeholder="Note"
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <div className="d-flex justify-content-center">
                <Button type="submit" className="btn btn-primary">
                  Add Appointment
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal for displaying note */}
      <Modal
        show={showNoteModal}
        onHide={() => setShowNoteModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display the selected note content */}
          <div>
            <p>{selectedNote || "No note available"}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoteModal(false)}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Enquiry */}
      <Modal
        show={showEnquiryModal}
        onHide={() => setShowEnquiryModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display Enquiry form or details */}
          <div>
            <p>Enquiry for Call Log ID: {selectedCallLog?.ivr_id}</p>
            {/* Enquiry Form */}
            <Form onSubmit={handleEnquirySubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Call Back Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="callBackDate"
                      value={enquiryForm.callBackDate}
                      onChange={handleEnquiryInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Enquiry Type</Form.Label>
                    <Form.Select
                      name="enquiryType"
                      onChange={handleEnquiryInputChange}
                      value={enquiryForm.enquiryType}
                      disabled={loading} // Disable the dropdown if loading
                    >
                      <option value="">Select Enquiry Type</option>
                      {/* Render Enquiry Type options dynamically */}
                      {enquiryTypes &&
                        enquiryTypes.length > 0 &&
                        enquiryTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientName"
                      value={enquiryForm.patientName}
                      onChange={handleEnquiryInputChange}
                      placeholder="Enter Patient Name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobileNumber"
                      value={enquiryForm.mobileNumber}
                      onChange={handleEnquiryInputChange}
                      placeholder="Enter Mobile Number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-20">
                    <Form.Label>FDE Name</Form.Label>
                    <Form.Select
                      name="fdeId"
                      value={formData.fdeId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select FDE Name</option>
                      {fdeList &&
                        fdeList.length > 0 &&
                        fdeList.map((fde) => (
                          <option key={fde.FDEID} value={fde.FDEID}>
                            {fde.FDEName}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Add Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="note"
                      value={enquiryForm.note}
                      onChange={handleEnquiryInputChange}
                      rows={3}
                      placeholder="Enter Note"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Add Enquiry
              </Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
