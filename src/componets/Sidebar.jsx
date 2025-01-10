import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import SimpleBar from 'simplebar-react';
import "simplebar/dist/simplebar.min.css"
import FeatherIcon from 'feather-icons-react';
import { useSidebarContext } from '../pages/api/useSidebarContext';
import logo from '/src/assets/images/logo/icon-logo.png';
import logo1 from '/src/assets/images/logo/icon-logo.png';
// import sidebarvactor from '/src/assets/images/pro-sec.png';
// For Font Awesome CSS
import 'font-awesome/css/font-awesome.min.css';

const menuPaths = {
    Dashboards: ["/index", "/doctor-dashboard", "/patient-dashboard"],
    Doctors: ["/doctor-schedule","/all-doctors", "/add-doctor", "/edit-doctor"],
    Patients: ["/all-patients", "/add-patient", "/edit-patient"],
    Appointments: ["/add-appointment", "/edit-appointment", "/appointment-list"],
    Hospitals: ["/all-hospitals", "/add-locations"],
  Receptionist: ["/receptionist-list", "/add-receptionist"],
  Consultation: ["/consultation-details", "/add-consultation"],
  LabTest: ["/Lab-test-list", "/Add-lab-test"],
  InsuranceCompany: ["/Company-details-list", "/Add-company-details"],
  FdeDetails: ["/fde-details-list", "/Add-fde-details"],
    Billing: ["/payment-list", "/add-payment", "/patient-invoice"],
  ManageReports: ["/dailyOPDReport","/birthdayAlert","billingReport","/enquiryConversation","/enquiryData","/oPDCollectionReport","/pharmacyCollectionReport","/iPDCollectionReport","/refferenceReport","/conditionWiseReport","/sxConversionReport","/iPDDueReport","/insuranceDueReport","/oPDIPDCollection","/oPDIDCollGraph","/oPDReceiptsReport"],
    // EventManagement: ["/event-management"],
    // AccessPages: ["/login", "/register", "/forgot-password", "/new-password", "/verify-email", "/verify-pin", "/error-page"],
    // Support: ["/faq", "/support"],
    // Table: ["/basic-table", "/data-table"],
    // Forms: ["/element-input", "/element-checkbox-radio", "/element-datepicker"],
    // Charts: ["/chart-apex", "/chart-echarts", "/chart-morris"],
    // AdvanceElement: ["/timeline-one", "/timeline-two", "/pricing", "/element-select2", "/element-switch", "/element-dropzone", "/element-sweetalert2", "/element-lightbox"],
    // Component: ["/element-typography", "/element-color", "/element-themeclass", "/element-alert", "/element-avtar", "/element-button", "/element-grid", "/element-dropdown", "/element-breadcrumb", "/element-accordion", "/element-badge", "/element-modal", "/element-tab", "/element-tooltip", "/element-card", "/element-progressbar", "/element-pagination"],
};
export default function Sidebar() {

 // Sidebar Menu    
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const currentPath = location.pathname;
        const category = Object.keys(menuPaths).find(key => menuPaths[key].includes(currentPath));
        const index = category ? Object.keys(menuPaths).indexOf(category) : null;
        setActiveIndex(index);
    }, [location.pathname]);

    const handleMenuClick = (index) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };      

    // Sidebar Action
    const { toggleSidebar } = useSidebarContext();   
    return (
      <div className="codex-sidebar">
        <div className="logo-gridwrap">
          <Link className="lightlogo" to="/">
            <img className="img-fluid" src={logo} alt="sidebar-lightlogo" />
            <span className="ms-2">HMS</span>
          </Link>
        </div>

        <SimpleBar className="codex-menu custom-scroll">
          <ul className="">
            <li className="cdxmenu-title">
              <h5>Main</h5>
            </li>

            <li
              onClick={() => handleMenuClick(0)}
              className={`menu-item ${activeIndex === 0 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <FeatherIcon icon="home" />
                </div>
                <span>Dashboard </span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/">Hospital Dashboard</Link>
                </li>
                <li>
                  <Link to="/doctor-dashboard">Doctor Dashboard</Link>
                </li>
                <li>
                  <Link to="/patient-dashboard">Patient Dashboard</Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => handleMenuClick(1)}
              className={`menu-item ${activeIndex === 1 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-user-md"></i>
                </div>
                <span>doctors</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/doctor-schedule">Doctor schedule</Link>
                </li>
                <li>
                  <Link to="/all-doctors">all doctors</Link>
                </li>
                <li>
                  <Link to="/add-doctor">add doctor</Link>
                </li>
                <li>
                  <Link to="/edit-doctor">edit doctor</Link>
                </li>
              </ul>
            </li>
            <li
              onClick={() => handleMenuClick(2)}
              className={`menu-item ${activeIndex === 2 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-wheelchair" aria-hidden="true"></i>
                </div>
                <span>patients</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/all-patients">all patients</Link>
                </li>
                <li>
                  <Link to="/add-patient">add patient</Link>
                </li>
                <li>
                  <Link to="/edit-patient">edit patient</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(3)}
              className={`menu-item ${activeIndex === 3 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-calendar"></i>
                </div>
                <span>Appointments</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/add-appointment">add appointment</Link>
                </li>
                <li>
                  <Link to="/edit-appointment">edit appointment</Link>
                </li>
                <li>
                  <Link to="/appointment-list">view all appointment</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(4)}
              className={`menu-item ${activeIndex === 4 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-hospital-o"></i>
                </div>
                <span>Hospitals Location</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/all-hospitals">List Hospital Location</Link>
                </li>
                <li>
                  <Link to="/add-locations">Add Hospital location</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(5)}
              className={`menu-item ${activeIndex === 5 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-male"></i>
                </div>
                <span>Receptionist</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/receptionist-list">Receptionist List</Link>
                </li>
                <li>
                  <Link to="/add-receptionist">Add Receptionist</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(6)}
              className={`menu-item ${activeIndex === 6 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-user-o"></i>
                </div>
                <span>Consultation Details</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/Consultation-details">Consultation Lists</Link>
                </li>
                <li>
                  <Link to="/Add-consultation">Add Consultation</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(7)}
              className={`menu-item ${activeIndex === 7 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-flask"></i>
                </div>
                <span>Laboratory Test</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/Lab-test-list">Lab Test List</Link>
                </li>
                <li>
                  <Link to="/Add-lab-test">Add Lab Test</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(8)}
              className={`menu-item ${activeIndex === 8 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-credit-card"></i>
                </div>
                <span>Insurance Comapany</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/Company-details-list">Company Details List</Link>
                </li>
                <li>
                  <Link to="/Add-company-details">Add Company Details</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(9)}
              className={`menu-item ${activeIndex === 9 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <i className="fa fa-user"></i>
                </div>
                <span>FDE Details</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/fde-details-list">FDE Details</Link>
                </li>
                <li>
                  <Link to="/Add-fde-details">Add FDE Details</Link>
                </li>
              </ul>
            </li>

            <li
              onClick={() => handleMenuClick(10)}
              className={`menu-item ${activeIndex === 10 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <FeatherIcon icon="file" />
                </div>
                <span>billing</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/payment-list">payment</Link>
                </li>
                <li>
                  <Link to="/add-payment">add payment</Link>
                </li>
                <li>
                  <Link to="/patient-invoice">patient invoice</Link>
                </li>
              </ul>
            </li>

            {/* <li
              onClick={() => handleMenuClick(11)}
              className={`menu-item ${activeIndex === 11 ? "active" : ""}`}
            >
              <Link>
                <div className="icon-item">
                  <FeatherIcon icon="file-text" />
                </div>
                <span>manage reports</span>
                <i className="fa fa-angle-down"></i>
              </Link>
              <ul className="submenu-list">
                <li>
                  <Link to="/dailyOPDReport">DailyOPDReport</Link>
                </li>
                <li>
                  <Link to="/birthdayAlert">BirthdayAlert</Link>
                </li>
                <li>
                  <Link to="/billingReport">Billing Report</Link>
                </li>
                <li>
                  <Link to="/enquiryConversation">Enquiry Conversation</Link>
                </li>
                <li>
                  <Link to="/enquiryData">Enquiry Data</Link>
                </li>
                <li>
                  <Link to="/oPDCollectionReport">OPD Collection Report</Link>
                </li>
                <li>
                  <Link to="/pharmacyCollectionReport">Pharmacy Collection Report</Link>
                </li>
                <li>
                  <Link to="/iPDCollectionReport">IPDCollection Report</Link>
                </li>
                <li>
                  <Link to="/referenceReport">Reference Report</Link>
                </li>
                <li>
                  <Link to="/conditionWiseReport">ConditionWise Report</Link>
                </li>
                <li>
                  <Link to="/sxConversionReport">SxConversion Report</Link>
                </li>
                <li>
                  <Link to="/iPDDueReport">IPDDueReport</Link>
                </li>
                <li>
                  <Link to="/insuranceDueReport">InsuranceDueReport</Link>
                </li>
                <li>
                  <Link to="/oPDIPDCollection">OPDIPDCollection</Link>
                </li>
                <li>
                  <Link to="/oPDIPDCollGraph">OPDIPDCollGraph</Link>
                </li>
                <li>
                  <Link to="/oPDReceiptsReport">OPDReceiptsReport</Link>
                </li>
              </ul>
            </li> */}

            {/* <li onClick={() => handleMenuClick(5)} className={`menu-item ${activeIndex === 5 ? 'active' : ''}`}>
                        <Link to="/event-management">
                            <div className="icon-item">
                            <FeatherIcon icon="list" />
                            </div>
                            <span>Event Management</span>
                        </Link>
                    </li>
                    <li onClick={() => handleMenuClick(6)} className={`menu-item ${activeIndex === 6 ? 'active' : ''}`}>
                        <Link >
                            <div className="icon-item">
                                <FeatherIcon icon="key" />
                            </div>
                            <span>Access Pages</span>
                            <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="submenu-list">
                            <li>
                                <Link to="/login">login</Link>
                            </li>
                            <li>
                                <Link to="/register">register</Link>
                            </li>
                            <li>
                                <Link to="/forgot-password">forgot password</Link>
                            </li>
                            <li>
                                <Link to="/new-password">reset password</Link>
                            </li>
                            <li>
                                <Link to="/verify-email">verify email</Link>
                            </li>
                            <li>
                                <Link to="/verify-pin">verify pin</Link>
                            </li>
                            <li>
                                <Link to="/error-page">404</Link>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => handleMenuClick(7)} className={`menu-item ${activeIndex === 7 ? 'active' : ''}`}>
                        <Link >
                            <div className="icon-item">
                            <i className="fa fa-life-ring"></i>
                            </div>
                            <span>support</span>
                            <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="submenu-list">
                            <li>
                                <Link to="/faq">faq</Link>
                            </li>
                            <li>
                                <Link to="/support">help center</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="cdxmenu-title">
                        <h5>user interface</h5>
                    </li>
                    <li onClick={() => handleMenuClick(8)} className={`menu-item ${activeIndex === 8 ? 'active' : ''}`}>
                        <Link >
                            <div className="icon-item">
                            <FeatherIcon icon="layers" />
                            </div>
                            <span>Table</span>
                            <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="submenu-list">
                            <li>
                                <Link to="/basic-table">table</Link>
                            </li>
                            <li>
                                <Link to="/data-table">data table</Link>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => handleMenuClick(9)} className={`menu-item ${activeIndex === 9 ? 'active' : ''}`}>
                        <Link >
                            <div className="icon-item">
                                
                            <i className="fa fa-sitemap"></i> 
                            </div>
                            <span>Forms</span>
                            <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="submenu-list">
                            <li>
                                <Link to="/element-input">form element</Link>
                            </li>
                            <li>
                                <Link to="/element-checkbox-radio">checkbox & radio</Link>
                            </li>
                            <li>
                                <Link to="/element-datepicker">datepicker</Link>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => handleMenuClick(10)} className={`menu-item ${activeIndex === 10 ? 'active' : ''}`}>
                        <Link >
                            <div className="icon-item">
                            <FeatherIcon icon="pie-chart" />
                            </div>
                            <span>Charts</span>
                            <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="submenu-list">
                            <li>
                                <Link to="/chart-apex">apex chart</Link>
                            </li>
                            <li>
                                <Link to="/chart-echarts">echarts</Link>
                            </li>
                            <li>
                                <Link to="/chart-morris">morris charts</Link>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => handleMenuClick(11)} className={`menu-item ${activeIndex === 11 ? 'active' : ''}`}>
                        <Link >
                            <div className="icon-item">
                            <FeatherIcon icon="database" />
                            </div>
                            <span>Advance element</span>
                            <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="submenu-list">
                            <li>
                                <Link to="/timeline-one">timeline one</Link>
                            </li>
                            <li>
                                <Link to="/timeline-two">timeline two</Link>
                            </li>
                            <li>
                                <Link to="/pricing">pricing tables</Link>
                            </li>
                            <li>
                                <Link to="/element-select2">select 2</Link>
                            </li>
                            <li>
                                <Link to="/element-switch">switch</Link>
                            </li>
                            <li>
                                <Link to="/element-dropzone">dropzone</Link>
                            </li>
                            <li>
                                <Link to="/element-sweetalert2">sweetalert2</Link>
                            </li>
                            <li>
                                <Link to="/element-lightbox">light box</Link>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => handleMenuClick(12)} className={`menu-item ${activeIndex === 12 ? 'active' : ''}`}>
                        <Link >
                            <div className="icon-item">
                            <FeatherIcon icon="layout" />
                            </div>
                            <span>Componet</span>
                            <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="submenu-list">
                            <li>
                                <Link to="/element-typography">typography</Link>
                            </li>
                            <li>
                                <Link to="/element-color">color</Link>
                            </li>
                            <li>
                                <Link to="/element-themeclass">helper class</Link>
                            </li>
                            <li>
                                <Link to="/element-alert">Alert </Link>
                            </li>
                            <li>
                                <Link to="/element-avtar">Avtar</Link>
                            </li>
                            <li>
                                <Link to="/element-button">Button </Link>
                            </li>
                            <li>
                                <Link to="/element-grid">grid</Link>
                            </li>
                            <li>
                                <Link to="/element-dropdown">Dropdown</Link>
                            </li>
                            <li>
                                <Link to="/element-breadcrumb">Breadcrumb</Link>
                            </li>
                            <li>
                                <Link to="/element-accordion">Accordion</Link>
                            </li>
                            <li>
                                <Link to="/element-badge">badge</Link>
                            </li>
                            <li>
                                <Link to="/element-modal">modal</Link>
                            </li>
                            <li>
                                <Link to="/element-tab">tabs</Link>
                            </li>
                            <li>
                                <Link to="/element-tooltip">tooltip</Link>
                            </li>
                            <li>
                                <Link to="/element-card">card</Link>
                            </li>
                            <li>
                                <Link to="/element-progressbar">progress bar</Link>
                            </li>
                            <li>
                                <Link to="/element-pagination">pagination</Link>
                            </li>
                        </ul>
                    </li> */}
          </ul>
        </SimpleBar>
        {/* <div className="sidebarpro-sec">
                <img className="img-fluid" src={sidebarvactor} alt="" />
                <h6>Best Experianced Helth<br />Care  Doctor</h6><Link className="btn btn-primary btn-sm" >Chek Now</Link>
            </div> */}
      </div>
    );
}