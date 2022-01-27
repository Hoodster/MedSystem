import axios from "axios";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Dashboard from "../../views/Dashboard";
import "./MailContactForm.css";

export default class MailContactForm extends Component {
  state = {
    doctors: [],
    selectedDoctor: "",
    emailMessage: "",
  };

  render() {
    const renderDoctorsOptions = this.state.doctors.map((doctor, index) => {
      return (
        <div
          data-index={index}
          className={`doctorsInfo${index} doctorsInfo`}
          key={doctor.id}
          data-email={doctor.email}
          onClick={this.handleClickOnDiv}
        >
          <h3 className="noPointers">
            {doctor.firstName} {doctor.lastName}
          </h3>
          <p className="noPointers">{doctor.email}</p>
        </div>
      );
    });

    return (
      <Dashboard>
        <div className="listOfDoctorsContainer">
          <h1 className="title">Wybierz lekarza z listy</h1>
          {renderDoctorsOptions}
        </div>
        <div className="mailFormContainer">
          <h2>Wiadomość do lekarza</h2>
          <Form>
            <Form.Group className="mb-3" controlId="mailBody">
              <Form.Label>Treść wiadomości mailowej do lekarza</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Napisz wiadomość email do lekarza..."
                value={this.state.emailMessage}
                onChange={this.handleEmailMessage}
                rows={10}
                cols={50}
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

  componentDidMount() {
    this.getAllDoctorsFromApi();
  }

  getAllDoctorsFromApi = () => {
    let doctors = [...this.state.doctors];
    axios.get("http://localhost:5000/api/doctor/doctorslist").then((resp) => {
      resp.data.forEach((doctor) => {
        doctors.push(doctor.user);
        this.setState({ doctors: doctors });
      });
    });
  };

  handleSelectedDoctor = (event) => {
    this.setState({ selectedDoctor: event.target.value });
  };

  handleEmailMessage = (event) => {
    let message = event.target.value;
    this.setState({ emailMessage: message });
  };

  handleSendMessage = () => {
    if (this.state.selectedDoctor !== "") {
      let message = this.state.emailMessage;
      let messageConverted = encodeURIComponent(message);
      window.open(
        `mailTo:${this.state.selectedDoctor}?subject=Wiadomość%20wygenerowana%20przez%20MedSystem&body=${messageConverted}`
      );
    } else {
      alert("Proszę wybrać lekarza z listy!");
    }
  };

  handleClickOnDiv = (event) => {
    let mail = event.target.attributes.getNamedItem("data-email").value;
    let index = event.target.attributes.getNamedItem("data-index").value;
    let divs = document.querySelectorAll(".doctorsInfo");
    divs = [...divs];
    divs.forEach((div) => {
      div.classList.remove("active");
    });
    document.querySelector(`.doctorsInfo${index}`).classList.add("active");
    this.setState({ selectedDoctor: mail });
  };
}
