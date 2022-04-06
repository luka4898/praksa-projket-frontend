import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";


const Header = (props) => {
  const logout = async () => {
    await fetch("https://localhost:7100/api/Authenticate/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    props.setName("");
  };
  let menu;
  let menu2;
  if (props.role != null && props.role != undefined) {
    if (JSON.stringify(props.role).indexOf("Admin") > -1) {
      menu2 = (
        <>
         <Nav.Link href="/manageevent">Manage Events</Nav.Link>
          <Nav.Link href="/venue">Venue</Nav.Link>
          <Nav.Link href="/city">City</Nav.Link>
          
        </>
      );
    }
  }
  if (props.name == null || props.name == " " || props.name =="undefined") {
    menu = (
      <>
        <Nav.Link href="/login">Log in</Nav.Link>
        <Nav.Link href="/registrate">Registrate</Nav.Link>
      </>
    );
  } else {
    menu = (
      <>
        <Nav.Link href="/login" onClick={logout}>
          Logout
        </Nav.Link>
      </>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">Event Managment</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">About us</Nav.Link>
            <Nav.Link href="/event">Events</Nav.Link>
            {menu2}
          </Nav>
          <Nav>{menu}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
