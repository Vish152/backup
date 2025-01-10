import React, { useState } from "react";

const OPDReceiptsReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [consultation, setConsultation] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const handleFind = () => {
    // Placeholder for API call or filtering logic
    console.log({
      fromDate,
      toDate,
      consultation,
      patientStatus,
      paymentMode,
    });
  };

  return (
    <div className="container mt-5">
      {/* Card for the report filters */}
      <div className="card">
        <div className="card-header">
          <h4>OPD Receipts Report</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="form-group col-md-3">
                <label htmlFor="fromDate">From Date</label>
                <input
                  id="fromDate"
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="toDate">To Date</label>
                <input
                  id="toDate"
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="consultation">Consultation</label>
                <select
                  id="consultation"
                  className="form-control"
                  value={consultation}
                  onChange={(e) => setConsultation(e.target.value)}
                >
                  <option value="">Select Consultation</option>
                  <option value="General">General</option>
                  <option value="Specialist">Specialist</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="patientStatus">Patient Status</label>
                <select
                  id="patientStatus"
                  className="form-control"
                  value={patientStatus}
                  onChange={(e) => setPatientStatus(e.target.value)}
                >
                  <option value="">Select Patient Status</option>
                  <option value="New">New</option>
                  <option value="Follow-Up">Follow-Up</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="paymentMode">Payment Mode</label>
                <select
                  id="paymentMode"
                  className="form-control"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="">Select Payment Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={handleFind}
                >
                  Find
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Receipts Data</h5>
          <div className="table-container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>Consultation</th>
                  <th>Patient Status</th>
                  <th>Spray Qty</th>
                  <th>Payment Mode</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer mt-4">
        <div className="d-flex justify-content-between">
          <div className="entries">
            <label htmlFor="entries">
              Show
              <select
                id="entries"
                className="form-control ml-2"
                style={{ width: "80px" }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              entries
            </label>
          </div>
          <div className="search">
            <label htmlFor="search">
              Search:{" "}
              <input
                id="search"
                type="text"
                className="form-control"
                style={{ width: "250px" }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OPDReceiptsReport;
