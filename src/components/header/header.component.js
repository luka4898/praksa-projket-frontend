import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = (props) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#">Event Managment</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">About us</Nav.Link>
          <NavDropdown title="Events" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#">Sport events</NavDropdown.Item>
            <NavDropdown.Item href="#">Concert Events</NavDropdown.Item>
            <NavDropdown.Item href="#">Festival Events</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Other</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Link to="/login">Log in</Link>

          <Link to="/registrate">Registrate</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
