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

export default function All_Hospitals() {
  const [show, setShow] = useState(false);

  const Close_btn = () => setShow(false);
  const emailcreat = () => setShow(true);
  //  Inuut value start
  const [formData, setFormData] = useState({
    srno: "",
    locationName: "",
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
      locationName: "Ahemdabad",
    },
    {
      srno: "2",
      locationName: "Andheri",
    },
    {
      srno: "3",
      locationName: "Baner",
    },
    {
      srno: "4",
      locationName: "Bangalore",
    },
    {
      srno: "5",
      locationName: "Belgavi",
    },
    {
      srno: "6",
      locationName: "Chakan",
    },
    {
      srno: "7",
      locationName: "Dighi",
    },
    {
      srno: "8",
      locationName: "DP Road",
    },
    {
      srno: "9",
      locationName: "Gurgaon",
    },
    {
      srno: "10",
      locationName: "Hinjewadi",
    },
    {
      srno: "11",
      locationName: "HSR",
    },
    {
      srno: "12",
      locationName: "Hydrabad",
    },
    {
      srno: "13",
      locationName: "Inirnagar",
    },
    {
      srno: "14",
      locationName: "Indore",
    },
    {
      srno: "15",
      locationName: "Kalaburagi",
    },
    {
      srno: "16",
      locationName: "Kemps-Corner",
    },
    {
      srno: "17",
      locationName: "Kolhapur",
    },
    {
      srno: "18",
      locationName: "Kothrud",
    },
    {
      srno: "19",
      locationName: "Lathur",
    },
    {
      srno: "20",
      locationName: "Ludhiana",
    },
    {
      srno: "21",
      locationName: "Mysore",
    },
    {
      srno: "22",
      locationName: "Nashik",
    },
    {
      srno: "23",
      locationName: "Navi-Mumbai",
    },
    {
      srno: "24",
      locationName: "Pimpri-Chinchwad",
    },
    {
      srno: "25",
      locationName: "Sahakarnagar",
    },
    {
      srno: "26",
      locationName: "Salunkhe-Vihar",
    },
    {
      srno: "27",
      locationName: "Secunderabad",
    },
    {
      srno: "28",
      locationName: "Surat",
    },
    {
      srno: "29",
      locationName: "Thane",
    },
    {
      srno: "30",
      locationName: "Tilak Road",
    },
    {
      srno: "31",
      locationName: "Undri",
    },
    {
      srno: "32",
      locationName: "Vashi",
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
        <PageBreadcrumb pagename="All Hospitals" />
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
                          Add Locations
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
                          field="locationName"
                          header="Location Name"
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
            <h5 className="modal-title">Add New Location</h5>
          </Modal.Title>
          <span className="close-modal" onClick={Close_btn}>
            <FeatherIcon icon="x" />
          </span>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form>
            <Row>
              {/* <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Hospital Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col> */}

              <Col md={6}>
                <Form.Group className="mb-20">
                  <Form.Label>Hospital Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    required
                    placeholder="Hospital Location"
                    value={formData.department}
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
