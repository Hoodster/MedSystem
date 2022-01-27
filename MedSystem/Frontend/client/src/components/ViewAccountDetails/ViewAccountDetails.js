import axios from "axios";
import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Dashboard from "../../views/Dashboard";

export default class ViewAccountDetails extends Component {
  state = {
    allData: "",
  };

  render() {
    return (
      <Dashboard>
        <h2 className="title">Informacje o Twoim koncie</h2>
        <br />
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formFirstName">
            <Form.Label column sm="2">
              Imię:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                aria-label="Disabled input example"
                readOnly
                defaultValue={this.state.allData.firstName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formSecondName">
            <Form.Label column sm="2">
              Drugie imię:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                aria-label="Disabled input example"
                readOnly
                defaultValue={this.state.allData.secondName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formLastName">
            <Form.Label column sm="2">
              Nazwisko:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                aria-label="Disabled input example"
                readOnly
                defaultValue={this.state.allData.lastName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPeselNumber">
            <Form.Label column sm="2">
              Numer PESEL:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                aria-label="Disabled input example"
                readOnly
                defaultValue={this.state.allData.pesel}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
            <Form.Label column sm="2">
              Numer telefonu:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                aria-label="Disabled input example"
                readOnly
                defaultValue={this.state.allData.phoneNumber}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formEmailAdress">
            <Form.Label column sm="2">
              Adres email:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                aria-label="Disabled input example"
                readOnly
                defaultValue={this.state.allData.email}
              />
            </Col>
          </Form.Group>
        </Form>
      </Dashboard>
    );
  }

  componentDidMount() {
    this.getUserAccountInfo();
  }

  getUserAccountInfo = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .get(`http://localhost:5000/api/account`, { headers: headers })
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            allData: resp.data,
          });
        }
      });
  };
}
