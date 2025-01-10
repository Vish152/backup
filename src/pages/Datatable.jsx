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

import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Datatable() {
  const emailcreat = () => setShow(true);

  // Data Table
  const sales = [
    {
      title: "Brielle Williamson",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "start",
    },
    {
      title: "Cedric Kelly",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "Canclled",
    },
    {
      title: "Charde Marshall",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "Canclled",
    },
    {
      title: "Dai Rios",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "pending",
    },
    {
      title: "Garrett Winters",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "pending",
    },
    {
      title: "Gloria Little",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "re schedule",
    },
    {
      title: "Jena Gaines",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "re schedule",
    },
    {
      title: "Pat Agonia",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "Canclled",
    },
    {
      title: "Paul Byrd",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "start",
    },
    {
      title: "Polly Tech",
      Mobile: "+1 25 962689",
      Email: "example@email.com",
      Date: "05/21/2023",
      Time: "9:00Am",
      inventoryStatus: "Canclled",
    },
  ];
  const PatientTemplate = ({ title }) => {
    return <span className="ml-10">{title}</span>;
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`badge status-${rowData.inventoryStatus.toLowerCase()}`}>
        {rowData.inventoryStatus}
      </span>
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
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
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
          <Link className="edit" to="/edit-patient">
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
        <PageBreadcrumb pagename="Datatable" />
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
                          header="Patient"
                          sortable
                          body={PatientTemplate}
                        ></div>
                        <div field="Mobile" header="Mobile" sortable></div>
                        <div field="Email" header="Email" sortable></div>
                        <div field="Date" header="Date" sortable></div>
                        <div field="Time" header="Time" sortable></div>
                        <div
                          header="Status"
                          body={statusBodyTemplate}
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
    </>
  );
}
