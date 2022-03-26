import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


const Header = (props) => {
    
    const logout = async () => {
        await fetch('https://localhost:7100/api/Authenticate/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        props.setName('');
    }
    let menu;
    if (props.name == null || props.name == ' ') {
        menu = (
            <>
                <Nav.Link href="/login">Log in</Nav.Link>
                <Nav.Link href="/registrate">Registrate</Nav.Link>
            </>
        )
    } else {
        menu = (
            <>
                <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
            </>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#">Event Managment</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                        <Nav.Link href="#">About us</Nav.Link>
                        <Nav.Link href="/venue">Venue</Nav.Link>
                        <Nav.Link href="/city">City</Nav.Link>
                        <NavDropdown title="Events" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#">Sport events</NavDropdown.Item>
                            <NavDropdown.Item href="#">Concert Events</NavDropdown.Item>
                            <NavDropdown.Item href="#">Festival Events</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Other</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {menu}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Header;


