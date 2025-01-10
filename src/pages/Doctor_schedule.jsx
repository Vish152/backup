import React from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import { Row, Col, Card, Container } from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";

export default function Doctor_schedule() {
  const events = [
    {
      title: "Appointment 1",
      start: "2024-08-01T10:00:00",
    },
    {
      title: "Appointment 2",
      start: "2024-08-01T11:00:00",
    },
    {
      title: "Appointment 3",
      start: "2024-08-01T12:00:00",
    },
    {
      title: "Appointment 4",
      start: "2024-08-01T13:00:00",
    },
    {
      title: "Appointment 5",
      start: "2024-08-07",
    },
    {
      id: 999,
      title: "Appointment 2",
      start: "2024-08-09T16:00:00",
    },
    {
      id: 999,
      title: "Appointment 7",
      start: "2024-08-16T16:00:00",
    },
  ];
  return (
    <div className="themebody-wrap">
      {/* Breadcrumb Start */}
      <PageBreadcrumb pagename="Doctor Schedule" />
      {/* Breadcrumb End */}
      {/* theme body start */}
      <div className="theme-body codex-calendar">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xxl={9}>
                      <div id="codex-calendar"></div>
                      <div id="example-component" className="codex-calendar">
                        <FullCalendar
                          id="your-custom-ID"
                          header={{
                            left: "prev,next today myCustomButton",
                            center: "title",
                            right: "month,basicWeek,basicDay,list ",
                          }}
                          defaultDate={"2024-08-12"}
                          navLinks={true}
                          editable={true}
                          eventLimit={true}
                          events={events}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* theme body end */}
      </div>
    </div>
  );
}
