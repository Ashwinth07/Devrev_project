import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Navbars() {
    const navigates = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const logoutuser = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        localStorage.removeItem("admin");
        navigates("/");
        setIsOpen(!isOpen);
      };
  return (
    <div>
    <Navbar  expand="lg" className='m-2' variant='dark' style={{backgroundColor:"#012a4a"}}>
      <Container fluid>
        {localStorage.getItem("admin")=="true" && (
        <Navbar.Brand href="#">Admin</Navbar.Brand>
        )}
        {localStorage.getItem("admin")=="false" && (
        <Navbar.Brand href="#">Booking</Navbar.Brand>
        )}
        {!localStorage.getItem("admin")=="false" && !localStorage.getItem("admin")=="true" &&(
        <Navbar.Brand href="#">Flight booking Booking</Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
           
            navbarScroll
          >
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/aboutus">About us</Nav.Link>
            <NavDropdown title="Services" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/bookingpage" >Booking</NavDropdown.Item>
              <NavDropdown.Item href="/viewflight">
               Flight Details
              </NavDropdown.Item>
              {localStorage.getItem("admin")=="true" && (
              <NavDropdown.Item href="/addflight">
               Add flight
              </NavDropdown.Item>
               )}
            </NavDropdown>
           
          </Nav>
          <Form className="d-flex mx-2" style={{gap:"13px"}} >
          {!localStorage.getItem("username") && (
            <Nav.Link href="/login"style={{color:"#eee"}} >
              Login
            </Nav.Link>
          )}
            {!localStorage.getItem("username") && (
            <Nav.Link href="/signup" style={{color:"#eee"}}>
              Signup
            </Nav.Link>
            )}
             {localStorage.getItem("username") && (
                <li className="d-flex gap-1">
                  <span class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{color:"#eee",border:"2px solid #eee",padding:"3px",width:"100px",marginRight:"50px"}}

                    >
                     Hi {localStorage.getItem("username")}
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" onClick={logoutuser}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </span>
                </li>
              )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}
