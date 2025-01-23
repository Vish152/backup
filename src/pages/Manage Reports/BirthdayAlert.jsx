import React from "react";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import { Row, Col, Card, Container, Table } from "react-bootstrap";
import SimpleBar from "simplebar-react";

// Static data for doctors
const doctorsData = [
  {
    id: 1,
    name: "Dr. Mahendra Shah",
    phone: "123-456-7890",
    birthday: "1990-01-15",
    address: "123 Main St, City, Country",
  },
  {
    id: 2,
    name: "Dr. Mahendra Shah",
    phone: "987-654-3210",
    birthday: "1985-02-22",
    address: "456 Elm St, City, Country",
  },
  {
    id: 3,
    name: "Lilavati Kamble",
    phone: "555-123-4567",
    birthday: "2000-03-10",
    address: "789 Pine St, City, Country",
  },
  {
    id: 4,
    name: "Omprakash Agrawal",
    phone: "111-222-3333",
    birthday: "2025-01-04",
    address: "101 Maple St, City, Country",
  },
  {
    id: 5,
    name: "Arjan Vaswani",
    phone: "123-456-7890",
    birthday: "1990-01-15",
    address: "123 Main St, City, Country",
  },
  {
    id: 6,
    name: "M.N. Shrivastav",
    phone: "987-654-3210",
    birthday: "1985-02-22",
    address: "456 Elm St, City, Country",
  },
  {
    id: 7,
    name: "Shanta Shewale",
    phone: "555-123-4567",
    birthday: "2000-03-10",
    address: "789 Pine St, City, Country",
  },
  {
    id: 8,
    name: "Harshal Shah",
    phone: "111-222-3333",
    birthday: "2025-01-04",
    address: "101 Maple St, City, Country",
  },
  {
    id: 9,
    name: "Shamshunasa Shaikh",
    phone: "123-456-7890",
    birthday: "1990-01-15",
    address: "123 Main St, City, Country",
  },
  {
    id: 10,
    name: "Krant Kishore Dubey",
    phone: "987-654-3210",
    birthday: "1985-02-22",
    address: "456 Elm St, City, Country",
  },
  {
    id: 11,
    name: "Mr. Ranjana Londhe",
    phone: "555-123-4567",
    birthday: "2000-03-10",
    address: "789 Pine St, City, Country",
  },
  {
    id: 12,
    name: "Mr. Pravin Jain",
    phone: "111-222-3333",
    birthday: "2025-01-04",
    address: "101 Maple St, City, Country",
  },
];

const BirthdayAlert = () => {
  return (
    <div
      className="themebody-wrap"
      style={{
        padding: "20px",
        backgroundColor: "#e0f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <PageBreadcrumb pagename="Birthday Alert" />

      <SimpleBar className="theme-body common-dash">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={12}>
              <Card
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderColor: "#90caf9",
                }}
              >
                <Card.Header
                  className="text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#01579b",
                    backgroundColor: "#e3f2fd",
                    borderBottom: "2px solid #0288d1",
                    padding: "1rem",
                  }}
                >
                  <h4>Birthday Alert - 02-01-2025</h4>
                </Card.Header>
                <Card.Body
                  style={{
                    padding: "25px",
                  }}
                >
                  {/* Birthday Alert Table */}
                  <Table
                    bordered
                    responsive
                    className="table-striped"
                    style={{
                      border: "1px solid #90caf9",
                      textAlign: "center",
                    }}
                  >
                    <thead
                      style={{
                        backgroundColor: "#0288d1",
                        color: "white",
                        fontSize: "16px",
                      }}
                    >
                      <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Phone No</th>
                        <th>Birthday Date</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorsData.map((doctor, index) => (
                        <tr key={doctor.id}>
                          <td style={{ padding: "10px" }}>{index + 1}</td>
                          <td>{doctor.name}</td>
                          <td>{doctor.phone}</td>
                          <td>{doctor.birthday}</td>
                          <td>{doctor.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </SimpleBar>
    </div>
  );
};

export default BirthdayAlert;
