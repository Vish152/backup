import React, { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import FeatherIcon from "feather-icons-react";

import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Modal,
  Button,
} from "react-bootstrap";

// import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Company_details_list() {
  const [show, setShow] = useState(false);

  const Close_btn = () => setShow(false);
  const emailcreat = () => setShow(true);
  //  Inuut value start
  const [formData, setFormData] = useState({
    srno: "",
    companyName: "",
    companyType: "",
    phoneNo: "",
    emailId: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Data Table
  const sales = [
    {
      srno: "1",
      companyName: "National Insurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "2",
      companyName: "United India Insurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "3",
      companyName: "New India Assurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "4",
      companyName: "Oriental Insurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "5",
      companyName: "ICICI Lombard",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "6",
      companyName: "Bajaj Allianz",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "7",
      companyName: "Reliance General Insurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "8",
      companyName: "HDFC ERGO",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "9",
      companyName: "Star Health",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "10",

      companyName: "SBI General Insurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "11",
      companyName: "Max Bupa Health Insurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
    {
      srno: "12",
      companyName: "Religare Health Insurance",
      companyType: "Company",
      phoneNo: "9876543210",
      emailId: "",
      address: "Pune",
    },
  ];

  //  SearchFilter
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
  });
  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 },
  };
  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters["global"].value = value;

    filtersMap[filtersKey].callback(filters);
  };

  const renderHeader = (filtersKey) => {
    const filters = filtersMap[`${filtersKey}`].value;
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="d-flex justify-content-end align-align-items-baseline">
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="pe-3 mb-0"> Search</Form.Label>
          <InputGroup className=" px-2">
            <Form.Control
              type="search"
              className="form-control px-2"
              value={value || ""}
              onChange={(e) => onGlobalFilterChange(e, filtersKey)}
              placeholder="Global Search"
            />
          </InputGroup>
        </Form.Group>
      </div>
    );
  };
  const header1 = renderHeader("filters1");

  const actionBodyTemplate = () => {
    return (
      <React.Fragment>
        <div className="cart-action">
          <Link className="edit" to="/edit-doctor">
            <FeatherIcon icon="edit" className="w-18" />
          </Link>
          <Link className="delete text-danger" to="">
            <FeatherIcon icon="trash-2" className="w-18" />
          </Link>
        </div>
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="themebody-wrap">
        {/* Breadcrumb Start */}
        <PageBreadcrumb pagename="Insurance Company" />
        {/* Breadcrumb End */}
        {/* theme body start */}
        <div className="theme-body">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Row className="Product_list">
                      <Col md={12}>
                        <Link
                          className="btn btn-primary float-end mb-15"
                          onClick={emailcreat}
                        >
                          <i className="fa fa-plus me-2"></i>
                          Add Company Details
                        </Link>
                      </Col>
                      <DataTable
                        value={sales}
                        rows={10}
                        header={header1}
                        filters={filters1}
                        onFilter={(e) => setFilters1(filters1)}
                        stateStorage="session"
                        paginator
                        rowsPerPageOptions={[5, 10, 50]}
                        paginatorTemplate="CurrentPageReport  FirstPageLink  PageLinks LastPageLink  RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        className="p-datatable-customers"
                      >
                        <div field="srno" header="Sr.No" sortable></div>
                        <div
                          field="companyName"
                          header="Company Name"
                          sortable
                        ></div>
                        <div
                          field="companyType"
                          header="Company Type"
                          sortable
                        ></div>
                        <div field="phoneNo" header="Phone No" sortable></div>
                        <div field="emailId" header="Email Id" sortable></div>
                        <div field="address" header="Address" sortable></div>
                        <div
                          field="Action"
                          header="Action"
                          sortable
                          body={actionBodyTemplate}
                          exportable={false}
                          style={{ minWidth: "8rem" }}
                        ></div>
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
      {/* Modal Start  */}
      <Modal show={show} onHide={Close_btn}>
        <Modal.Header>
          <Modal.Title>
            <h5 className="modal-title">Add Company Details</h5>
          </Modal.Title>
          <span className="close-modal" onClick={Close_btn}>
            <FeatherIcon icon="x" />
          </span>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Company Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyType"
                    placeholder="Company Type"
                    value={formData.companyType}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNo"
                    placeholder="Phone No"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="emailId"
                    placeholder="Email Id"
                    value={formData.emailId}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="btn btn-primary">Save</Button>
          <Button className="btn btn-danger" onClick={Close_btn}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal End  */}
    </>
  );
}
