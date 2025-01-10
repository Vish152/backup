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

import IMAGE_URLS from "/src/pages/api/Imgconfig.js";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Receptionist_list() {
  const [show, setShow] = useState(false);

  const Close_btn = () => setShow(false);
  const emailcreat = () => setShow(true);
  //  Inuut value start
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
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
      image: "avtar/2.jpg",
      title: "Akshay",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/7.jpg",
      title: "Dr. Hal Appeno",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/9.jpg",
      title: "Dr. Pat Agonia",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/3.jpg",
      title: "Dr. Paul Molive",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/8.jpg",
      title: "Dr. Polly Tech",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/5.jpg",
      title: "Dr. Poppa Cherry",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/6.jpg",
      title: "Dr. Saul T. Balls",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/4.jpg",
      title: "Dr. Terry Aki",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/1.jpg",
      title: "Dr. Tiger Nixon",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
    {
      image: "avtar/2.jpg",
      title: "Dr. Anna Mull",
      email: "example@email.com",
      Address: "ichalkarnaji",
      Phone: "+1 25 962689",
    },
  ];
  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = ({ image, title }) => {
    return (
      <div className="d-flex align-items-center">
        <img
          src={IMAGE_URLS[image]}
          alt={image.image}
          className="product-image rounded-50 w-40"
        />
        <span className="ml-10">{title}</span>
      </div>
    );
  };

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
        <PageBreadcrumb pagename="Receptionist List" />
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
                          Add Receptionist
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
                        <div
                          header="Receptionist Name"
                          sortable
                          body={imageBodyTemplate}
                        ></div>
                        <div field="email" header="Email" sortable></div>
                        <div field="Address" header="Address" sortable></div>
                        <div field="Phone" header="Mobile" sortable></div>
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
            <h5 className="modal-title">Add New Doctor</h5>
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
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Doctor Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    required
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    required
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    name="degree"
                    required
                    placeholder="Degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    required
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    placeholder="Email Id"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Categories</Form.Label>
                  <select
                    className="form-select hidesearch"
                    name="categories"
                    placeholder="Select"
                    value={formData.categories}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Main">Main</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Checkby">Checkby</option>
                    <option value="Madeby">Madeby</option>
                  </select>
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
