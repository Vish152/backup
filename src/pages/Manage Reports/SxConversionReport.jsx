import React, { useState } from "react";

const SxConversionReport = () => {
  // State for form inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Placeholder data for enquiry data (can be replaced with real API data)
  const enquiryData = [
    {
      date: "2025-01-01",
      customer: "John Smith",
      enquiryType: "Service Inquiry",
    },
  ];

  // Filter data based on selected dates
  const filteredData = enquiryData.filter((entry) => {
    const isDateValid =
      (!fromDate || new Date(entry.date) >= new Date(fromDate)) &&
      (!toDate || new Date(entry.date) <= new Date(toDate));
    return isDateValid;
  });

  // Handle Find button click
  const handleFindClick = () => {
    console.log(`Filtering enquiry data from ${fromDate} to ${toDate}`);
  };

  return (
    <div className="enquiry-data-container">
      <h1>SxConversion Report</h1>

      {/* Filters */}
      <div className="filter-container">
        <div className="form-group">
          <label>From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>To Date:</label>
          <div className="to-date-container">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <button className="find-button" onClick={handleFindClick}>
              Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SxConversionReport;
