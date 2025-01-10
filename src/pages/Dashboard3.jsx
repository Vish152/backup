import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Container } from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";

import Chart from "react-apexcharts";
import {
  bloodpreport,
  heartrate,
  glucoserate,
  clolesterol,
  bloodlevel,
} from "./js/Dashboard3";
import IMAGE_URLS from "/src/pages/api/Imgconfig.js";

export default function Dashboard3() {
  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Patient Dashboard" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <div className="theme-body">
        <Container fluid className="cdxuser-profile">
          <Row>
            <Col xxl={4} xl={12}>
              <Row>
                <Col xxl={12} md={6}>
                  <Card>
                    <Card.Header>
                      <h4>Personal Information</h4>
                    </Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <ul className="contact-list">
                          <li>
                            {" "}
                            <span>name:</span>Daniel Smith
                          </li>
                          <li>
                            {" "}
                            <span>date of birth:</span>18-09-2015
                          </li>
                          <li>
                            {" "}
                            <span>Gender:</span>Male
                          </li>
                          <li>
                            {" "}
                            <span>Address:</span>Live In Uk
                          </li>
                          <li>
                            {" "}
                            <span>Phone:</span>+1 80 606590
                          </li>
                          <li>
                            {" "}
                            <span>Email:</span>daniel@example.com
                          </li>
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xxl={12} md={6}>
                  <Card className="doctor-probox">
                    <div className="img-wrap"></div>
                    <Card.Body>
                      <div className="profile-head">
                        <div className="proimg-wrap">
                          <img
                            className="img-fluid"
                            src={IMAGE_URLS["avtar/1.jpg"]}
                            alt=""
                          />
                        </div>
                        <h4>Cedric Kelly</h4>
                        <span>25 years, California</span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam,
                        </p>
                      </div>
                    </Card.Body>
                    <ul className="docactivity-list">
                      <li>
                        <h4>50kg</h4>
                        <span>Weight</span>
                      </li>
                      <li>
                        <h4>170cm</h4>
                        <span>Height</span>
                      </li>
                      <li>
                        <h4>55kg</h4>
                        <span>Goal</span>
                      </li>
                    </ul>
                  </Card>
                </Col>
                <Col xxl={12} lg={6}>
                  <Card>
                    <Card.Header>
                      <h4>Notifications</h4>
                    </Card.Header>
                    <Card.Body>
                      <ul className="docnoti-list">
                        <li>
                          <div className="media">
                            <img
                              className="rounded-50 w-40"
                              src={IMAGE_URLS["avtar/1.jpg"]}
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Dr. Anna Send you Photo</h6>
                              <span className="text-light">10, Feb ,2023</span>
                            </div>
                            <div className="badge badge-primary">10:15 Pm</div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <img
                              className="rounded-50 w-40"
                              src={IMAGE_URLS["avtar/2.jpg"]}
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Dr. Anna Send you Photo</h6>
                              <span className="text-light">
                                05, March ,2023
                              </span>
                            </div>
                            <div className="badge badge-primary">09:20 Pm</div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <img
                              className="rounded-50 w-40"
                              src={IMAGE_URLS["avtar/3.jpg"]}
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Dr. Anna Send you Photo</h6>
                              <span className="text-light">01, Jan ,2023</span>
                            </div>
                            <div className="badge badge-primary">03:40 Pm</div>
                          </div>
                        </li>
                        <li>
                          <div className="media">
                            <img
                              className="rounded-50 w-40"
                              src={IMAGE_URLS["avtar/4.jpg"]}
                              alt=""
                            />
                            <div className="media-body">
                              <h6>Dr. Anna Send you Photo</h6>
                              <span className="text-light">25, Feb ,2023</span>
                            </div>
                            <div className="badge badge-primary">05:26 Am </div>
                          </div>
                        </li>
                      </ul>
                    </Card.Body>
                    <Card.Footer>
                      <Link className="btn btn-primary d-block mx-auto btn-lg">
                        See All Notification{" "}
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xxl={8} xl={12}>
              <Row>
                <Col sm={6}>
                  <div className="card patientreport-card">
                    <div className="card-header border-0">
                      <div>
                        <h4>Blood pressure</h4>
                        <span>In the normal</span>
                      </div>
                      <div className="report-count">
                        <h3 className="text-primary">120/80</h3>
                        <span>mmHG</span>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <Chart
                        options={bloodpreport}
                        series={bloodpreport.series}
                        height={200}
                        type="area"
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="card patientreport-card">
                    <div className="card-header border-0">
                      <div>
                        <h4>Heart Rate</h4>
                        <span>Above the normal</span>
                      </div>
                      <div className="report-count">
                        <h3 className="text-secondary">99</h3>
                        <span>Per min</span>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <Chart
                        options={heartrate}
                        series={heartrate.series}
                        height={200}
                        type="area"
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="card patientreport-card">
                    <div className="card-header border-0">
                      <div>
                        <h4>Glucose Rate</h4>
                        <span>In the normal</span>
                      </div>
                      <div className="report-count">
                        <h3 className="text-success">97</h3>
                        <span>mg/dl</span>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <Chart
                        options={glucoserate}
                        series={glucoserate.series}
                        height={200}
                        type="area"
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="card patientreport-card">
                    <div className="card-header border-0">
                      <div>
                        <h4>Clolesterol</h4>
                        <span>In the normal</span>
                      </div>
                      <div className="report-count">
                        <h3 className="text-warning">124</h3>
                        <span>mg/dl</span>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <Chart
                        options={clolesterol}
                        series={clolesterol.series}
                        height={200}
                        type="area"
                      />
                    </div>
                  </div>
                </Col>
                <Col xl={12}>
                  <div className="card">
                    <div className="card-header">
                      <h4>Patient Visits</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <Table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Doctor Name</th>
                              <th>visit Date</th>
                              <th>visit Time </th>
                              <th>Treatment</th>
                              <th>Charges</th>
                              <th>Status </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Dr. Tiger Nixon</td>
                              <td>10/05/2023</td>
                              <td>09:30 Am</td>
                              <td>Operation</td>
                              <td>$80</td>
                              <td>Resheduled</td>
                            </tr>
                            <tr>
                              <td>Dr. Hal Appeno</td>
                              <td>05/06/2023</td>
                              <td>08:00 Am</td>
                              <td>Check up</td>
                              <td>$50</td>
                              <td>Fever</td>
                            </tr>
                            <tr>
                              <td>Dr. Pat Agonia</td>
                              <td>20/02/2023</td>
                              <td>10:30 Am</td>
                              <td>Admit</td>
                              <td>$75</td>
                              <td>Ortho</td>
                            </tr>
                            <tr>
                              <td>Dr. Paul Molive</td>
                              <td>15/08/2023</td>
                              <td>03:00 Pm</td>
                              <td> Blood Test</td>
                              <td>$60</td>
                              <td>General Check-up</td>
                            </tr>
                            <tr>
                              <td>Dr. Polly Tech</td>
                              <td>12/07/2023</td>
                              <td>12:00 Pm</td>
                              <td>Discharge</td>
                              <td>$40</td>
                              <td>Injury</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl={12}>
                  <div className="card">
                    <div className="card-header">
                      <h4>Patient Activities</h4>
                    </div>
                    <div className="card-body">
                      {/* <div id="bloodlevel"></div> */}
                      <Chart
                        options={bloodlevel}
                        series={bloodlevel.series}
                        height={375}
                        type="line"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      {/* theme body end */}
    </div>
  );
}
