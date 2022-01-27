import React, { Component } from "react";
import Dashboard from "../../views/Dashboard";
import "./MailContactFormDoctor.css";
import { Form, Button } from "react-bootstrap";

export default class MailContactFormDoctor extends Component {
  state = {
    emailMessage: "",
  };

  handleEmailMessage = (event) => {
    let message = event.target.value;
    this.setState({ emailMessage: message });
  };

  handleSendMessage = () => {
    if (this.state.emailMessage !== "") {
      let message = this.state.emailMessage;
      let messageConverted = encodeURIComponent(message);
      window.open(
        `mailTo:admin@test.com?subject=Wiadomość%20wygenerowana%20przez%20MedSystem&body=${messageConverted}`
      );
    } else {
      alert("Proszę wwypełnić pole z wiadomością!");
    }
  };

  render() {
    return (
      <Dashboard>
        <div className="doctorMailFormContainer">
          <h1 className="title">Wiadomość do administratora</h1>
          <p></p>
          <Form>
            <Form.Group className="mb-3" controlId="mailBody">
              <Form.Label>
                W przypadku jakichkolwiek problemów z funkcjonowaniem systemu
                lub w razie potrzeby wygaszenia pacjenta proszę skontaktować się
                z administratorem systemu za pomocą tego formularza:
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Napisz wiadomość email do administratora..."
                value={this.state.emailMessage}
                onChange={this.handleEmailMessage}
                rows="15"
                cols="80"
                wrap="soft"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={this.handleSendMessage}
            >
              Wyślij
            </Button>
          </Form>
        </div>
      </Dashboard>
    );
  }
}
