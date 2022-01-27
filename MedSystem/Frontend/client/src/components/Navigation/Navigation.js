import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navigation.css";

export default class Navigation extends Component {
  render() {
    return (
      <Navbar
        className="med-system-navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/">MedSystem</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">{this.props.children}</Nav>
            <Nav>
              <Nav.Link onClick={this.handleLogout} href="/">
                Wyloguj się
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };
}
