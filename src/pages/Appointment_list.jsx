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

export default function Appointment_list() {
  const [appointment, setAppointmentdata] = useState([]); // Appointment data state
  const [doctors, setDoctors] = useState([]); // Doctors list
  const [fdeList, setFdeList] = useState([]); // FDE list
  const [consultationList, setConsultationList] = useState([]);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [fromDate, setFromDate] = useState(formatDate(new Date()));
  const [toDate, setToDate] = useState(formatDate(new Date()));
  const [loading, setLoading] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [type, setType] = useState("");
  const [showActionButtons, setShowActionButtons] = useState(true);

  const typeList = ["NEW", "FOLLOW", "POSTOPERATIVE"];

  const handleAddReceipt = () => {
    const newReceipt = {
      consultationName: formData.consultaion_name,
      totalAmount: selectedAppointment.totalAmount,
      paymentMode: formData.paymentMode,
    };

    setReceipts([...receipts, newReceipt]);
    setFormData({
      consultaion_name: "",
      paymentMode: "",
    });
    setSelectedAppointment({
      ...selectedAppointment,
      totalAmount: "",
    });
  };

  const formatToApiDate = (appointment_timestamp) => {
    if (!appointment_timestamp) return "";
    const [day, month, year] = appointment_timestamp.split("-");
    return `${year}-${month}-${day}`;
  };

  const fetchAppointmentData = async () => {
    setLoading(true);
    try {
      const url = new URL(`${BASE_URL}/V1/appointment/listAppointments`);
      const params = {
        from: formatToApiDate(fromDate),
        to: formatToApiDate(toDate),
      };

      Object.keys(params).forEach((key) => {
        if (params[key]) url.searchParams.append(key, params[key]);
      });

      console.log("Request URL:", url.toString());

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Fetched Data:", data.data);
        setAppointmentdata(data.data || []);
      } else {
        console.error("Error fetching appointments:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchAppointmentData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const consultationResponse = await fetch(
        `${BASE_URL}/V1/appointment/consultationDropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (consultationResponse.ok) {
        const consultationData = await consultationResponse.json();
        console.log("Consultation API Response:", consultationData);
        setConsultationList(
          Array.isArray(consultationData.data) ? consultationData.data : []
        );
      } else {
        console.error("Failed to fetch consultations:", consultationResponse.statusText);
      }

      const doctorResponse = await fetch(
        `${BASE_URL}/V1/appointment/doctorDropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (doctorResponse.ok) {
        const doctorData = await doctorResponse.json();
        console.log("Doctors API Response:", doctorData);
        setDoctors(Array.isArray(doctorData.data) ? doctorData.data : []);
      } else {
        console.error("Failed to fetch doctors:", doctorResponse.statusText);
      }

      const fdeResponse = await fetch(
       `${BASE_URL}/V1/appointment/fdeDropdown`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (fdeResponse.ok) {
        const fdeData = await fdeResponse.json();
        console.log("FDE API Response:", fdeData);
        setFdeList(Array.isArray(fdeData.data) ? fdeData.data : []);
      } else {
        console.error("Failed to fetch FDE list:", fdeResponse.statusText);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error.message);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);


const handleHistory = async (appointmentId) => {
  const isConfirmed = window.confirm(
    "Complete the Patient History Process..."
  );
  if (isConfirmed) {
    try {
      const response = await fetch(`${BASE_URL}/V1/appointment/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId }),
      });

      if (response.ok) {
        alert("History successfully!");
        fetchAppointmentData();
      } else {
        console.error("Failed to fetch history:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching history:", error.message);
    }
  }
};

const handleExecution = async (appointmentId) => {
  const isConfirmed = window.confirm(
    "Complete the Patient Executive Process..."
  );
  if (isConfirmed) {
    try {
      const response = await fetch(`${BASE_URL}/V1/appointment/execution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId }),
      });

      if (response.ok) {
        alert("Execution successfully!");
        fetchAppointmentData();
      } else {
        console.error("Failed execution:", response.statusText);
      }
    } catch (error) {
      console.error("Error execution:", error.message);
    }
  }
};

const handleConsultation = async (appointmentId) => {
  const isConfirmed = window.confirm(
    "Complete the Patient Consultation Process..."
  );
  if (isConfirmed) {
    try {
      const response = await fetch(
        `${BASE_URL}/V1/appointment/consultation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appointmentId }),
        }
      );

      if (response.ok) {
        alert("Consultation successfully!");
        fetchAppointmentData();
      } else {
        console.error("Failed Consultation:", response.statusText);
      }
    } catch (error) {
      console.error("Error Consultation:", error.message);
    }
  }
};

const actionBodyTemplate = (rowData) => {
  const [actionStage, setActionStage] = useState(1); // Start from Stage 1

  const [disabledButtons, setDisabledButtons] = useState({
    edit: false,
    delete: false,
    confirm: false, // Initially enabled
    history: true, // Initially disabled until confirm is clicked
    execution: true, // Initially disabled until history is clicked
    consultation: true, // Initially disabled until execution is clicked
  });
const handleConfirmClick = async () => {
  // Prevent action if disabled
  if (disabledButtons.confirm) return;

  // Check if `rowData` and `rowData._id` are valid
  if (!rowData || !rowData._id) {
    console.error("Invalid rowData or appointment ID:", rowData);
    alert("Invalid appointment data. Please try again.");
    return;
  }

  const appointment_id = rowData._id; // Use _id instead of appointment_id
  console.log("Sending appointment_id:", appointment_id);

  try {
    // Confirm the appointment
    const confirmResponse = await fetch(
      `${BASE_URL}/V1/appointment/confirmAppointment/${appointment_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );

    if (!confirmResponse.ok) {
      console.error(
        "Failed to confirm appointment:",
        confirmResponse.status,
        confirmResponse.statusText
      );
      alert("Failed to confirm the appointment. Please try again.");
      return;
    }

    console.log("Appointment confirmed successfully!");
    alert("Appointment confirmed!");

    // Update button states
    setDisabledButtons((prev) => ({
      ...prev,
      confirm: true,
      history: false,
    }));

    // Add to patient list
    const patientResponse = await fetch(`${BASE_URL}/V1/patient/listPatient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appointment_id: rowData._id, // Use _id instead of appointment_id
        patient_id: rowData.patient_id,
      }),
    });

    if (!patientResponse.ok) {
      console.error(
        "Failed to add to patient list:",
        patientResponse.status,
        patientResponse.statusText
      );
      alert("Failed to update patient list.");
    } else {
      console.log("Patient list updated successfully.");
    }

    // Refresh appointment data
    fetchAppointmentData();
  } catch (error) {
    console.error("Error confirming appointment:", error);
    alert(
      "An error occurred while confirming the appointment. Please try again."
    );
  }
};


  const handleHistoryClick = async () => {
    if (disabledButtons.history) return;

    if (!rowData || !rowData.id) {
      console.error("Invalid rowData or appointment ID for history:", rowData);
      alert("Invalid appointment data. Please try again.");
      return;
    }

    try {
      const historyResponse = await fetch(
        `${BASE_URL}/V1/appointment/history`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: rowData.id }),
        }
      );

      if (historyResponse.ok) {
        alert("History process completed!");
        setDisabledButtons((prev) => ({
          ...prev,
          history: true,
          execution: false,
        }));
      } else {
        console.error("Failed to handle history:", historyResponse.statusText);
        alert("Failed to process history. Please try again.");
      }
    } catch (error) {
      console.error("Error handling history:", error);
      alert("An error occurred while processing history. Please try again.");
    }
  };

  const handleExecutionClick = async () => {
    if (disabledButtons.execution) return;
    try {
      const executionResponse = await fetch(
        `${BASE_URL}/V1/appointment/execution`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: rowData.id }),
        }
      );

      if (executionResponse.ok) {
        alert("Execution process completed!");
        setDisabledButtons((prev) => ({
          ...prev,
          execution: true,
          consultation: false,
        }));
      }
    } catch (error) {
      console.error("Error handling execution:", error);
    }
  };

  const handleConsultationClick = async () => {
    if (disabledButtons.consultation) return;
    try {
      const consultationResponse = await fetch(
        `${BASE_URL}/V1/appointment/consultation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: rowData.id }),
        }
      );

      if (consultationResponse.ok) {
        alert("Consultation process completed!");
        setDisabledButtons((prev) => ({
          ...prev,
          consultation: true,
        }));
      }
    } catch (error) {
      console.error("Error handling consultation:", error);
    }
  };

  return (
    <div
      className="cart-action"
      style={{
        margin: "5px",
        display: "flex",
        gap: "5px",
        border: "1px solid #ccc", // Border around the box
        padding: "10px", // Padding inside the box
        borderRadius: "8px", // Rounded corners
      }}
    >
      <Link
        title="Edit"
        style={{
          width: "35px",
          height: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          padding: "0",
          border: "1px solid #ddd",
          margin: "2px",
          pointerEvents: disabledButtons.edit ? "none" : "auto", // Disable interaction when button is disabled
        }}
        onClick={() => {
          setSelectedAppointment(rowData);
          setShowEditModal(true);
        }}
        disabled={disabledButtons.edit}
      >
        <FeatherIcon icon="edit" className="w-18" />
      </Link>

      <Link
        className="delete text-danger"
        title="Cancel"
        style={{
          width: "35px",
          height: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          padding: "0",
          border: "1px solid #ddd",
          margin: "2px",
          pointerEvents: disabledButtons.delete ? "none" : "auto", // Disable interaction when button is disabled
        }}
        onClick={() => {
          setSelectedAppointment(rowData);
          setShowDeleteModal(true);
        }}
        disabled={disabledButtons.delete}
      >
        <FeatherIcon icon="trash-2" className="w-18" />
      </Link>

      <Link
        className="appointment"
        title="Confirm"
        style={{
          width: "35px",
          height: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          padding: "0",
          border: "1px solid #ddd",
          margin: "2px",
        }}
        onClick={handleConfirmClick}
        disabled={disabledButtons.confirm}
      >
        <FeatherIcon icon="check" className="w-18" />
      </Link>

      {/* Show History button only after confirming the appointment */}
      {actionStage >= 2 && (
        <Link
          className="history"
          title="History"
          style={{
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            padding: "0",
            border: "1px solid #ddd",
            margin: "2px",
            pointerEvents: disabledButtons.history ? "none" : "auto", // Disable interaction when button is disabled
          }}
          onClick={handleHistoryClick}
          disabled={disabledButtons.history}
        >
          <FeatherIcon icon="clock" className="w-18" />
        </Link>
      )}

      {/* Show Execution button only after clicking on History */}
      {actionStage >= 3 && (
        <Link
          className="appointment"
          title="Execution"
          style={{
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            padding: "0",
            border: "1px solid #ddd",
            margin: "2px",
          }}
          onClick={handleExecutionClick}
          disabled={disabledButtons.execution}
        >
          <FeatherIcon icon="list" className="w-18" />
        </Link>
      )}

      {/* Show Consultation button only after clicking on Execution */}
      {actionStage >= 4 && (
        <Link
          className="consultation"
          title="Consultation"
          style={{
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            padding: "0",
            border: "1px solid #ddd",
            margin: "2px",
          }}
          onClick={handleConsultationClick}
          disabled={disabledButtons.consultation}
        >
          <FeatherIcon icon="user-check" className="w-18" />
        </Link>
      )}

      {/* Receipt button is never disabled */}
      {actionStage >= 5 && (
        <Link
          title="Receipts"
          style={{
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            padding: "0",
            border: "1px solid #ddd",
            margin: "2px",
          }}
          onClick={() => {
            setSelectedAppointment(rowData);
            setShowReceiptModal(true);
          }}
        >
          <FeatherIcon icon="file-text" className="w-18" />
        </Link>
      )}
    </div>
  );
};
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDelete = () => {
    console.log("Deleting appointment:", selectedAppointment);
    console.log("Reason for cancellation:", cancellationReason);
    // Add your delete API logic here
    setShowDeleteModal(false);
    setCancellationReason("");
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
              style={{ borderRadius: "8px" }}
            />
          </InputGroup>
        </Form.Group>
      </div>

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
            style={{ borderRadius: "8px" }}
          />
        </Form.Group>
        <Form.Group className="pe-3 mb-0">
          To Date
          <Form.Control
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ borderRadius: "8px" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={fetchAppointmentData}
          style={{ borderRadius: "8px" }}
        >
          Refresh Data
        </Button>
      </div>
    </div>
  );

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/V1/appointment/editAppointment/:phone`, {
        method: "PUT", // Assuming you use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAppointment), // Send the updated appointment data
      });

      if (response.ok) {
        alert("Appointment updated successfully!");
        fetchAppointmentData(); // Refresh the appointment list
        setShowEditModal(false); // Close the modal
      } else {
        const errorData = await response.json();
        console.error("Failed to update appointment:", errorData.message);
        alert("Failed to update appointment: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating appointment:", error.message);
      alert("Error updating appointment: " + error.message);
    }
  };

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
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment ? (
            <Form>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedAppointment.date}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          date: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Appointment Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={selectedAppointment.appointmentTime || ""}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          appointmentTime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={selectedAppointment.confirmTime || ""}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          confirmTime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="mb-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }));
                      }}
                    >
                      <option value="">Select Type</option>
                      {typeList.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedAppointment.patientName || ""}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          patientName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedAppointment.mobileNo || ""}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          mobileNo: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
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
                          <option
                            key={doctor.doctor_id}
                            value={doctor.doctor_id}
                          >
                            {doctor.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No doctors available</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
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
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={selectedAppointment.note || ""}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          note: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="primary"
                onClick={handleSaveChanges} // Call the save function
              >
                Save Changes
              </Button>
            </Form>
          ) : (
            <p>Loading appointment details...</p>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reason of Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            placeholder="Enter the cancellation reason..."
            rows="4"
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showReceiptModal}
        onHide={() => setShowReceiptModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment ? (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedAppointment.patientName || ""}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          patientName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Consultant Doctor</Form.Label>
                    <Form.Select
                      name="doctorid"
                      value={formData.doctorId}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          doctorName: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a Doctor</option>
                      {doctors && doctors.length > 0 ? (
                        doctors.map((doctor) => (
                          <option
                            key={doctor.doctor_id}
                            value={doctor.doctor_id}
                          >
                            {doctor.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No doctors available</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <div>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="DNC"
                        value="dnc"
                        checked={formData.paymentType === "dnc"}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <div>
                      <Form.Check
                        type="radio"
                        name="paymentType"
                        label="DNW"
                        value="dnw"
                        checked={formData.paymentType === "dnw"}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <div>
                      <Form.Check
                        type="radio"
                        name="payment Type"
                        label="DNP"
                        value="dnp"
                        checked={formData.paymentType === "dnp"}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Discount Amount</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedAppointment.discountAmount || ""}
                        onChange={(e) =>
                          setSelectedAppointment({
                            ...selectedAppointment,
                            discountAmount: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Discount Note</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={selectedAppointment.discountNote || ""}
                        onChange={(e) =>
                          setSelectedAppointment({
                            ...selectedAppointment,
                            discountNote: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Consultant Name</Form.Label>
                    <Form.Select
                      name="consultaion_name" // Ensure this matches the key in formData
                      value={formData.consultaion_name} // Use formData for controlled input
                      onChange={handleInputChange}
                    >
                      <option value="">Select a consultant</option>
                      {consultationList &&
                        consultationList.length > 0 &&
                        consultationList.map((consultation) => (
                          <option
                            key={consultation.consultation_id}
                            value={consultation.consultation_name}
                          >
                            {consultation.consultation_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Total Amount"
                      value={selectedAppointment.totalAmount || ""}
                      onChange={(e) =>
                        setSelectedAppointment({
                          ...selectedAppointment,
                          totalAmount: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Mode</Form.Label>
                  <select
                    className="form-select"
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="online">Online</option>
                  </select>
                </Form.Group>
              </Col>

              {/* Receipts Table */}
              <div className="mb-3">
                <h5>Receipts</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Consultation Name</th>
                      <th>Total Amount</th>
                      <th>Payment Mode</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((receipt, index) => (
                      <tr key={index}>
                        <td>{receipt.consultationName}</td>
                        <td>{receipt.totalAmount}</td>
                        <td>{receipt.paymentMode}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              const updatedReceipts = receipts.filter(
                                (_, i) => i !== index
                              );
                              setReceipts(updatedReceipts);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Receipt Button */}
              <Button
                variant="secondary"
                onClick={handleAddReceipt}
                className="mb-3"
                style={{
                  marginTop: "2px",
                }}
              >
                + Add Receipt
              </Button>

              {/* Save Button */}
              <Button
                variant="primary"
                onClick={() => {
                  console.log("Updated appointment:", selectedAppointment);
                  console.log("Receipts:", receipts); // Log receipts for debugging
                  setShowEditModal(false);
                }}
                className="mb-3"
                style={{
                  marginTop: "2px",
                  marginLeft: "10px",
                }}
              >
                Save
              </Button>
            </Form>
          ) : (
            <p>Loading appointment details...</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Breadcrumb */}
      <PageBreadcrumb pagename="Appointment List" />
      {/* Theme body */}
      <div
        className="theme-body"
        style={{
          background: "linear-gradient(to right, #e0f7fa, #80deea)",
          fontFamily: "'Poppins', Arial, sans-serif",
          minHeight: "100vh",
        }}
      >
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                style={{
                  marginLeft:
                    "-30px" /* Pull the card out by 20px on the left */,
                  marginRight:
                    "-30px" /* Pull the card out by 20px on the right */,
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
                      style={{
                        margin: "0 -100px", // Expand the inner box by reducing left and right margins
                        padding: "20px", // Add padding for spacing
                        background: "white",
                        borderRadius: "10px", // Smooth corners for inner box
                        border: "1px solid #4dd0e1", // Inner box border styling
                      }}
                    >
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <DataTable
                      value={appointment}
                      paginator
                      rows={10}
                      filters={filters1}
                      header={header}
                      globalFilterFields={[
                        "appointment_id",
                        "appointment_timestamp",
                        "appointmentTime",
                        "confirm_time",
                        "patient_type",
                        "patientName",
                        "mobileNo",
                        "doctorName",
                        "doctor_id",
                        "FDE_Name",
                        "note",
                        // "patient_id",
                        // "appointmentTimestamp",
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
                        border: "1px solid #4dd0e1", // Add a visible border
                        marginTop: "-10px", // Slightly reduce top margin
                        marginLeft: "-30px", // Increase left margin pull
                        marginRight: "-30px", // Increase right margin pull
                        width: "calc(100% + 30px + 30px)", // Compensate for negative margins
                        background: "white", // Ensure a clean background
                        borderRadius: "12px", // Smoother corners
                        overflow: "hidden", // Hide content overflow
                        padding: "15px", // Add padding for inner content
                      }}
                    >
                      <Column
                        field="appointment_id"
                        header="Sr.No"
                        sortable
                        style={{
                          width: "60px",
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.2rem",
                        }}
                      />
                      <Column
                        field="appointment_timestamp"
                        header="Date"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.5rem",
                        }}
                      />
                      <Column
                        field="appointmentTime"
                        header="Appo.Time"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.1rem",
                        }}
                      />
                      <Column
                        field="confirm_time"
                        header="Confirm Time"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.2rem",
                        }}
                      />
                      <Column
                        field="patient_type"
                        header="Type"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="patientName"
                        header="Patient Name"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        field="mobileNo"
                        header="Contact No"
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />
                      <Column
                        header="Doctor Details"
                        body={(rowData) =>
                          `${rowData.doctorName}`
                        }
                        sortable
                        style={{
                          border: "1px solid #90caf9",
                          textAlign: "center",
                          padding: "0.75rem",
                        }}
                      />

                      <Column
                        field="fdeName"
                        header="FDE Name"
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

