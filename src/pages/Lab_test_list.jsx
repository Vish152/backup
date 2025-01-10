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

export default function Lab_test_list() {
  const [show, setShow] = useState(false);

  const Close_btn = () => setShow(false);
  const emailcreat = () => setShow(true);
  //  Inuut value start
  const [formData, setFormData] = useState({
    srno: "",
    testName: "",
    shortCode: "",
    testAmount: "",
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
      testName: "CBC",
      shortCode: "CBC",
      testAmount: "290",
    },
    {
      srno: "2",
      testName: "B.T/C.T Work Up",
      shortCode: "BTCT",
      testAmount: "1000",
    },
    {
      srno: "3",
      testName: "BSL-R",
      shortCode: "BSL",
      testAmount: "100",
    },
    {
      srno: "4",
      testName: "Blood Group",
      shortCode: "CN",
      testAmount: "280",
    },
    {
      srno: "5",
      testName: "HIV",
      shortCode: "HIV",
      testAmount: "600",
    },
    {
      srno: "6",
      testName: "HBSAG",
      shortCode: "HB",
      testAmount: "580",
    },
    {
      srno: "7",
      testName: "VDRL",
      shortCode: "VDRL",
      testAmount: "290",
    },
    {
      srno: "8",
      testName: "CREATININE Serum by JAFEE w/o DEPROTEINIZATION",
      shortCode: "CREATININE",
      testAmount: "230",
    },
    {
      srno: "9",
      testName: "Cytology",
      shortCode: "CY",
      testAmount: "530",
    },
    {
      srno: "10",
      testName: "Pus Culture and Sensitivity",
      shortCode: "PCS",
      testAmount: "1200",
    },
    {
      srno: "11",
      testName: "Electrolytes in Serum",
      shortCode: "ELE",
      testAmount: "530",
    },
    {
      srno: "12",
      testName: "Histopath(Small)",
      shortCode: "HPS",
      testAmount: "1100",
    },
    {
      srno: "13",
      testName: "Histopath(Medium)",
      shortCode: "HPM",
      testAmount: "2500",
    },
    {
      srno: "14",
      testName: "Histopath(Large)",
      shortCode: "HPL",
      testAmount: "3300",
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
        <PageBreadcrumb pagename="Laboratory Test" />
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
                          Add Lab Test
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
                        <div field="testName" header="Test Name" sortable></div>
                        <div
                          field="shortCode"
                          header="Short Code"
                          sortable
                        ></div>
                        <div
                          field="testAmount"
                          header="Test Amount"
                          sortable
                        ></div>
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
            <h5 className="modal-title">Add Lab Test</h5>
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
                  <Form.Label>Test Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Consultation Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Short Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Short Code"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Test Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="name"
                    placeholder="Test Amount"
                    value={formData.name}
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
