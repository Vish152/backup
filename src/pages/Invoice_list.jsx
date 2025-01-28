import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";
import { Link } from "react-router-dom";

const BASE_URL = "http://192.168.90.166:5000/api";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [surgeons, setSurgeons] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [tpa, setTpa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    dynamicRows: [],
    Sub_Total: "0.00",
    discount: "0.00",
    pdc: "0.00",
    payableAmount: "0.00",
  });

  const initialFormData = { ...formData };

  // Fetch invoices on mount
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${BASE_URL}/V1/invoice/listInvoice`);
        const data = await response.json();
        if (response.ok) {
          setInvoices(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch invoices");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching invoices.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const endpoints = [
          { url: "/V1/invoice/consultant_dropdown", setter: setConsultants },
          { url: "/V1/invoice/surgeon_dropdown", setter: setSurgeons },
          { url: "/V1/invoice/insurance_co_dropdown", setter: setInsurance },
          { url: "/V1/invoice/tpa_dropdown", setter: setTpa },
        ];

        for (const { url, setter } of endpoints) {
          const response = await fetch(`${BASE_URL}${url}`);
          const data = await response.json();
          if (response.ok) setter(data.data || []);
        }
      } catch (err) {
        setError("Failed to fetch dropdown data.");
      }
    };

    fetchDropdowns();
  }, []);

  // Update payable amount
  useEffect(() => {
    const subTotal = parseFloat(formData.Sub_Total || 0);
    const discount = parseFloat(formData.discount || 0);
    const pdc = parseFloat(formData.pdc || 0);

    let payableAmount =
      subTotal - (formData.bill_method === "PDC" ? pdc : discount);
    payableAmount = Math.max(payableAmount, 0).toFixed(2);

    setFormData((prevData) => ({
      ...prevData,
      payableAmount,
    }));
  }, [
    formData.Sub_Total,
    formData.discount,
    formData.pdc,
    formData.bill_method,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (["discount", "pdc"].includes(name)) {
      const discount = parseFloat(updatedFormData.discount || 0);
      const pdc = parseFloat(updatedFormData.pdc || 0);
      const subTotal = parseFloat(updatedFormData.Sub_Total || 0);

      const payable = Math.max(
        subTotal - (updatedFormData.bill_method === "PDC" ? pdc : discount),
        0
      );
      updatedFormData.payableAmount = payable.toFixed(2);
    }

    if (name === "bill_method" && value === "reimbursement") {
      updatedFormData.payableAmount = parseFloat(
        updatedFormData.Sub_Total || 0
      ).toFixed(2);
    }

    setFormData(updatedFormData);
  };

  const handleDynamicRowChange = (index, field, value) => {
    const updatedRows = formData.dynamicRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );

    const newSubTotal = updatedRows.reduce(
      (total, row) => total + parseFloat(row.value || 0),
      0
    );

    setFormData({
      ...formData,
      dynamicRows: updatedRows,
      Sub_Total: newSubTotal.toFixed(2),
    });
  };

  const addDynamicRow = () => {
    setFormData({
      ...formData,
      dynamicRows: [...formData.dynamicRows, { label: "", value: "" }],
    });
  };

  const deleteDynamicRow = (index) => {
    const updatedRows = formData.dynamicRows.filter((_, i) => i !== index);
    setFormData({ ...formData, dynamicRows: updatedRows });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setError("");
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };
  const handleSaveChanges = async () => {
    if (selectedInvoice) {
      try {
        const response = await fetch(
          `${BASE_URL}/V1/invoice/${selectedInvoice.invoice_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedInvoice),
          }
        );

        const result = await response.json();

        if (response.ok) {
          // Update the invoice in the state
          setInvoices((prevInvoices) =>
            prevInvoices.map((invoice) =>
              invoice.invoice_id === selectedInvoice.invoice_id
                ? { ...invoice, ...selectedInvoice } // Update invoice with new details
                : invoice
            )
          );

          alert("Invoice updated successfully!");
          handleCloseModal(); // Close the modal
          setShowSuccessPopup(true); // Show success popup
        } else {
          alert(result.message || "Error updating invoice.");
        }
      } catch (err) {
        alert("An error occurred while updating the invoice.");
      }
    }
  };
  const updatePayableAmt = (updatedInvoice) => {
    let payableAmt = updatedInvoice.Sub_Total;

    // If PDC is present, deduct it from the Sub_Total to get the payable amount
    if (updatedInvoice.bill_method === "PDC") {
      const pdcAmount = parseFloat(updatedInvoice.pdc) || 0;
      payableAmt = updatedInvoice.Sub_Total - pdcAmount;
    }

    // Update the payable amount in the invoice state
    updatedInvoice.payable_amt = payableAmt;
    setSelectedInvoice(updatedInvoice);
  };
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };


  return (
    <div
      className="themebody-wrap"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #80deea)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Poppins', Arial, sans-serif",
      }}
    >
      <PageBreadcrumb pagename="Invoice List" />
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
                <div className="d-flex justify-content-between mb-3">
                  <h5>Invoice List</h5>
                  <Link to="/add-invoice">
                    <Button variant="primary">Add New Invoice</Button>
                  </Link>
                </div>

                {loading && <p>Loading invoices...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && invoices.length > 0 && (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Date</th>
                        <th>Patient Name</th>
                        <th>Phone No</th>
                        <th>Pay Mode</th>
                        <th>Payable Amount</th>
                        <th>Due Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.invoice_id}>
                          <td>{invoice.invoice_id}</td>
                          <td>{invoice.creation_date}</td>
                          <td>{invoice.patientName}</td>
                          <td>{invoice.phone}</td>
                          <td>{invoice.pay_mode}</td>
                          <td>{invoice.payable_amt}</td>
                          <td>{invoice.due_amt}</td>
                          <td>
                            <Link>
                              <Button variant="info" size="sm" className="me-2">
                                Print
                              </Button>
                            </Link>
                            <Button
                              variant="warning"
                              onClick={() => handleEditInvoice(invoice)}
                            >
                              Edit Invoice
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <Form>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="invoiceId">
                    <Form.Label>Invoice ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.invoice_id}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-3">
                  <Form.Group controlId="admission_no">
                    <Form.Label>Admission No</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.admission_no}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          admission_no: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-3">
                  <Form.Group controlId="patientName">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.patientName}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          patientName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                {/* Discharge Details */}
                <Col md={4} className="mb-3">
                  <Form.Group controlId="discharge_date">
                    <Form.Label>Discharge Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.discharge_date}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          discharge_date: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-3">
                  <Form.Group controlId="dischargetime">
                    <Form.Label>Discharge Time</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.dischargetime}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          dischargetime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-3">
                  <Form.Group controlId="bed_category">
                    <Form.Label>Bed Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.bed_category}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          bed_category: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                {/* Admission Details */}
                <Col md={4} className="mb-3">
                  <Form.Group controlId="admission_date">
                    <Form.Label>Admission Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.admission_date}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          admission_date: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-3">
                  <Form.Group controlId="admissiontime">
                    <Form.Label>Admission Time</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.admissiontime}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          admissiontime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-3">
                  <Form.Group controlId="consultantName">
                    <Form.Label>Consultant Name</Form.Label>
                    <Form.Select
                      value={selectedInvoice?.consultantName || ""}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          consultantName: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Consultant</option>
                      {[
                        ...new Set([
                          ...invoices.map((invoice) => invoice.consultantName),
                          ...consultants.map((consultant) => consultant.name),
                        ]),
                      ].map((consultantName, index) => (
                        <option key={index} value={consultantName}>
                          {consultantName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Surgeon Name */}
                <Col md={4} className="mb-3">
                  <Form.Group controlId="surgeonName">
                    <Form.Label>Surgeon Name</Form.Label>
                    <Form.Select
                      value={selectedInvoice?.surgeonName || ""}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          surgeonName: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Surgeon</option>
                      {[
                        ...new Set([
                          ...invoices.map((invoice) => invoice.surgeonName),
                          ...surgeons.map((surgeon) => surgeon.name),
                        ]),
                      ].map((surgeonName, index) => (
                        <option key={index} value={surgeonName}>
                          {surgeonName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-4">
                  <div>
                    <Form.Label>Bill Label</Form.Label>
                    {selectedInvoice.dynamicRows.map((row, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Label"
                          value={row.label || ""}
                          onChange={(e) => {
                            const updatedInvoice = { ...selectedInvoice };
                            updatedInvoice.dynamicRows[index].label =
                              e.target.value;
                            setSelectedInvoice(updatedInvoice);
                            handleDynamicRowChange(
                              index,
                              "label",
                              e.target.value
                            );

                            // Recalculate Sub_Total after updating label
                            const subTotal = updatedInvoice.dynamicRows.reduce(
                              (total, row) =>
                                total + (parseFloat(row.value) || 0),
                              0
                            );
                            updatedInvoice.Sub_Total = subTotal;

                            // Recalculate the payable amount after Sub_Total change
                            updatePayableAmt(updatedInvoice);
                          }}
                          style={{ width: "45%" }}
                        />

                        <Form.Control
                          type="text"
                          placeholder="Value"
                          value={row.value || ""}
                          onChange={(e) => {
                            const updatedInvoice = { ...selectedInvoice };
                            updatedInvoice.dynamicRows[index].value =
                              e.target.value;

                            // Recalculate Sub_Total after updating value
                            const subTotal = updatedInvoice.dynamicRows.reduce(
                              (total, row) =>
                                total + (parseFloat(row.value) || 0),
                              0
                            );
                            updatedInvoice.Sub_Total = subTotal;

                            // Update the state
                            setSelectedInvoice(updatedInvoice);

                            // Recalculate the payable amount after Sub_Total change
                            updatePayableAmt(updatedInvoice);
                          }}
                          style={{ width: "45%" }}
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const updatedInvoice = { ...selectedInvoice };
                            updatedInvoice.dynamicRows.splice(index, 1); // Remove the row
                            const subTotal = updatedInvoice.dynamicRows.reduce(
                              (total, row) =>
                                total + (parseFloat(row.value) || 0),
                              0
                            );
                            updatedInvoice.Sub_Total = subTotal;
                            setSelectedInvoice(updatedInvoice);
                            updatePayableAmt(updatedInvoice); // Recalculate payable amount after removing row
                          }}
                          className="btn btn-danger"
                          style={{ width: "10%" }}
                        >
                          -
                        </button>
                      </div>
                    ))}

                    {/* Add New Row */}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedInvoice = { ...selectedInvoice };
                        updatedInvoice.dynamicRows.push({
                          label: "",
                          value: "",
                        }); // Add new row with empty fields
                        setSelectedInvoice(updatedInvoice);

                        // Recalculate Sub_Total after adding new row
                        const subTotal = updatedInvoice.dynamicRows.reduce(
                          (total, row) => total + (parseFloat(row.value) || 0),
                          0
                        );
                        updatedInvoice.Sub_Total = subTotal;

                        // Recalculate payable amount after adding new row
                        updatePayableAmt(updatedInvoice);
                      }}
                      className="btn btn-success"
                    >
                      + Add Row
                    </button>
                  </div>
                </Col>

                {/* Sub Total */}
                <Col md={4} className="mb-3">
                  <Form.Group controlId="Sub_Total">
                    <Form.Label>Sub Total</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedInvoice.Sub_Total}
                      onChange={(e) => {
                        const updatedInvoice = { ...selectedInvoice };
                        updatedInvoice.Sub_Total =
                          parseFloat(e.target.value) || 0;
                        setSelectedInvoice(updatedInvoice);

                        // Recalculate payable amount when Sub_Total is changed
                        updatePayableAmt(updatedInvoice);
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={4} className="mb-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Bill Type</Form.Label>
                    <Form.Select
                      id="bill_Type"
                      name="bill_Type"
                      value={selectedInvoice.bill_Type}
                      onChange={(e) => {
                        const updatedInvoice = { ...selectedInvoice };
                        updatedInvoice.bill_Type = e.target.value;
                        setSelectedInvoice(updatedInvoice);

                        // Recalculate payable amount when bill type changes
                        updatePayableAmt(updatedInvoice);
                      }}
                      isInvalid={error.bill_Type}
                    >
                      <option value="" disabled>
                        Select Bill Type
                      </option>
                      <option value="insurance">Insurance</option>
                      <option value="non_insurance">Non-Insurance</option>
                      <option value="charity">Charity</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {error.bill_Type}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Conditional fields for Insurance */}
                {selectedInvoice.bill_Type === "insurance" && (
                  <>
                    <Col md={4} className="mb-3">
                      <Form.Group controlId="insurance">
                        <Form.Label>Insurance Company</Form.Label>
                        <Form.Select
                          value={selectedInvoice?.insurance || ""}
                          onChange={(e) => {
                            const updatedInvoice = { ...selectedInvoice };
                            updatedInvoice.insurance = e.target.value;
                            setSelectedInvoice(updatedInvoice);
                            updatePayableAmt(updatedInvoice); // Recalculate payable amount when insurance company is selected
                          }}
                        >
                          <option value="">Select Insurance Company</option>
                          {[
                            ...new Set([
                              ...invoices.map((invoice) => invoice.insurance),
                              ...insurance.map(
                                (insurance) => insurance.companyname
                              ),
                            ]),
                          ].map((companyName, index) => (
                            <option key={index} value={companyName}>
                              {companyName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4} className="mb-3">
                      <Form.Group controlId="tpa">
                        <Form.Label>TPA</Form.Label>
                        <Form.Select
                          value={selectedInvoice?.tpa || ""}
                          onChange={(e) => {
                            const updatedInvoice = { ...selectedInvoice };
                            updatedInvoice.tpa = e.target.value;
                            setSelectedInvoice(updatedInvoice);
                            updatePayableAmt(updatedInvoice); // Recalculate payable amount when TPA is selected
                          }}
                        >
                          <option value="">Select TPA Company</option>
                          {[
                            ...new Set([
                              ...invoices.map((invoice) => invoice.tpa),
                              ...tpa.map((tpa) => tpa.companyname),
                            ]),
                          ].map((companyName, index) => (
                            <option key={index} value={companyName}>
                              {companyName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Bill Method (for insurance) */}
                    {selectedInvoice.insurance && (
                      <Col md={4} className="mb-3">
                        <Form.Group className="mb-3">
                          <Form.Label>Bill Method</Form.Label>
                          <Form.Select
                            value={selectedInvoice.bill_method}
                            onChange={(e) => {
                              const updatedInvoice = { ...selectedInvoice };
                              updatedInvoice.bill_method = e.target.value;
                              setSelectedInvoice(updatedInvoice);
                              updatePayableAmt(updatedInvoice); // Recalculate payable amount when bill method changes
                            }}
                            isInvalid={error.bill_method}
                          >
                            <option value="" disabled>
                              Select Bill Method
                            </option>
                            <option value="cashless">Cashless</option>
                            <option value="PDC">PDC</option>
                            <option value="reimbursement">Reimbursement</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {error.bill_method}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    )}

                    {/* Conditional fields for PDC */}
                    {selectedInvoice.bill_method === "PDC" && (
                      <>
                        <Col md={4} className="mb-3">
                          <Form.Group controlId="chequeno">
                            <Form.Label>Enter Cheque No</Form.Label>
                            <Form.Control
                              type="number"
                              value={selectedInvoice.chequeno}
                              onChange={(e) => {
                                const updatedInvoice = { ...selectedInvoice };
                                updatedInvoice.chequeno = e.target.value;
                                setSelectedInvoice(updatedInvoice);
                                updatePayableAmt(updatedInvoice); // Recalculate payable amount when cheque number is entered
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={4} className="mb-3">
                          <Form.Group controlId="pdc">
                            <Form.Label>Enter PDC Amount</Form.Label>
                            <Form.Control
                              type="number"
                              value={selectedInvoice.pdc}
                              onChange={(e) => {
                                const updatedInvoice = { ...selectedInvoice };
                                updatedInvoice.pdc = e.target.value;
                                setSelectedInvoice(updatedInvoice);

                                // Recalculate payable amount after PDC change
                                updatePayableAmt(updatedInvoice);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={4} className="mb-3">
                          <Form.Group controlId="payable_amt">
                            <Form.Label>Payable Amount</Form.Label>
                            <Form.Control
                              type="number"
                              value={selectedInvoice.payable_amt}
                              onChange={(e) => {
                                const updatedInvoice = { ...selectedInvoice };
                                updatedInvoice.payable_amt = e.target.value;
                                setSelectedInvoice(updatedInvoice);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )}
                  </>
                )}
                {/* Fields for Non-Insurance or Charity */}
                {(selectedInvoice.bill_Type === "non_insurance" ||
                  selectedInvoice.bill_Type === "charity") && (
                  <>
                    <Col md={4} className="mb-3">
                      <Form.Group controlId="discount">
                        <Form.Label>Discount Amount</Form.Label>
                        <Form.Control
                          type="number"
                          value={selectedInvoice.discount}
                          onChange={(e) => {
                            const discountAmount = parseFloat(e.target.value); // Ensure the discount is a number
                            const updatedInvoice = {
                              ...selectedInvoice,
                              discount: discountAmount,
                            };

                            // Apply the discount to Sub_Total and update payable_amt
                            updatedInvoice.payable_amt =
                              updatedInvoice.Sub_Total - discountAmount;

                            // Update the state with the modified invoice
                            setSelectedInvoice(updatedInvoice);
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4} className="mb-3">
                      <Form.Group controlId="payableAmount">
                        <Form.Label>Payable Amount</Form.Label>
                        <Form.Control
                          type="number"
                          value={selectedInvoice.payable_amt}
                          readOnly // Payable amount is automatically calculated and read-only
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}
                {/* For Reimbursement bill method */}
                {selectedInvoice.bill_method === "reimbursement" && (
                  <Col md={4} className="mb-3">
                    <Form.Group controlId="payableAmount">
                      <Form.Label>Payable Amount</Form.Label>
                      <Form.Control
                        type="number"
                        value={selectedInvoice.Sub_Total}
                        onChange={(e) =>
                          setSelectedInvoice({
                            ...selectedInvoice,
                            Sub_Total: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                )}

                {/* Note */}

                <Col md={4} className="mb-3">
                  <Form.Group controlId="note">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedInvoice.note}
                      onChange={(e) =>
                        setSelectedInvoice({
                          ...selectedInvoice,
                          note: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Modal.Footer>
                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showSuccessPopup} onHide={handleCloseSuccessPopup} centered>
        <Modal.Body className="text-center">
          <div className="mb-3">
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "50px", color: "green" }}
            ></i>
          </div>
          <h4>Successfully</h4>
          <p>Data has been updated</p>
          <Button variant="primary" onClick={handleCloseSuccessPopup}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InvoiceList;