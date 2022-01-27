import React, { Component } from "react";
import { questions } from "../../models/Questions";
import { Button, Form } from "react-bootstrap";
import Dashboard from "../../views/Dashboard";
import axios from "axios";

export default class ViewQuestionnaireDoctor extends Component {
  state = {
    pesel: "",
    questionnaire: [],
  };

  render() {
    let renderPosition;
    if (this.state.questionnaire.length !== 0) {
      renderPosition = questions.map((question) => {
        let answer = this.state.questionnaire[0][`${question.shortName}`];
        switch (answer) {
          case "Yes":
            answer = "Tak";
            break;
          case "No":
            answer = "Nie";
            break;
          default:
            answer = "Nie wiem";
            break;
        }

        return (
          <p key={question.id}>
            {question.question}: {answer}
          </p>
        );
      });
    }

    return (
      <Dashboard title="Ankiety zdrowotne">
        <Form.Group className="mb-3">
          <Form.Label>Podaj pesel pacjenta</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz pesel pacjenta"
            onChange={this.handlePeselInputOnChange}
            value={this.state.pesel}
          />
        </Form.Group>
        <Button
          className="findPrescriptionButton"
          onClick={this.getPatientQuestionnaire}
        >
          Znajdź ankietę zdrowotną
        </Button>
        {this.state.questionnaire.length !== 0 && (
          <p>
            Odpowiedzi ankiety zdrowotnej pacjenta o peselu: {this.state.pesel}
          </p>
        )}
        {renderPosition}
      </Dashboard>
    );
  }

  handlePeselInputOnChange = (event) => {
    this.setState({
      pesel: event.target.value,
    });
  };

  getPatientQuestionnaire = () => {
    axios
      .get(
        `http://localhost:5000/api/patient/getQuestionnaireByPesel?pesel=${this.state.pesel}`
      )
      .then((resp) => {
        if (resp.data.length === 0) {
          alert("Wybrany pacjent nie posiada ankiety zdrowotnej");
        } else {
          this.setState({ questionnaire: resp.data });
        }
      })
      .catch((error) => {
        alert("Wpisany pesel nie należy do żadnego pacjenta w systemie");
      });
  };
}
