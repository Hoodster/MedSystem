import React, { Component } from "react";
import "./Questionnaire.css";
import axios from "axios";
import { questions } from "../../models/Questions";
import { Button, Form } from "react-bootstrap";

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heartDiseases: "",
      bloodDiseases: "",
      lungDiseases: "",
      rheumaticDiseases: "",
      ophthalmicDiseases: "",
      cancers: "",
      kidneyDisease: "",
      liverDisease: "",
      stroke: "",
      epilepsy: "",
      osteoporosis: "",
      aids: "",
      diabetes: "",
      allergyToAnesthetics: "",
      drugAllergy: "",
      allergyToDentalMaterials: "",
      conditionsNotMentioned: "",
      takeMedications: "",
      surgicalProcedures: "",
      cytostaticDrugs: "",
      organTransplant: "",
    };
  }

  questions = [...questions];

  componentDidMount() {
    if (this.props.edit) {
      this.getQuestionnaireAnswers();
    }
  }

  postQuestionnaireToApi = () => {
    axios
      .post(
        "http://localhost:5000/api/account/register",
        JSON.parse(localStorage.getItem("registeredData"))
      )
      .then((resp) => {
        localStorage.setItem("userId", resp.data);
        let questionnaireObject = JSON.parse(JSON.stringify(this.state));
        questionnaireObject.patientId = localStorage.getItem("userId");

        axios
          .post(
            "http://localhost:5000/api/patient/questionnaire",
            questionnaireObject
          )
          .then((resp) => {
            let email = JSON.parse(
              localStorage.getItem("registeredData")
            ).email;
            let password = JSON.parse(
              localStorage.getItem("registeredData")
            ).password;
            axios
              .post("http://localhost:5000/api/account/signin", {
                email: email,
                password: password,
              })
              .then((resp) => {
                localStorage.setItem("token", resp.data.token);
                localStorage.removeItem("userId");
                localStorage.removeItem("registeredData");
                localStorage.setItem("role", "patient");
                window.location.href = "/";
              });
          });
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Proszę sprawdzić uzupełnione dane rejsestracyjne, jeśli są poprawne prawdopodobnie użytkownik ma już konto w systemie."
        );
        window.location.href = "/";
      });
  };

  putQuestionnaireToApi = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .put("http://localhost:5000/api/patient/questionnaire", this.state, {
        headers: headers,
      })
      .then((resp) => {
        alert("Pomyślnie uaktualniłeś ankietę!");
      });
  };

  getQuestionnaireAnswers = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("http://localhost:5000/api/patient/questionnaire", {
        headers: headers,
      })
      .then((resp) => {
        this.setState({
          heartDiseases: resp.data.heartDiseases,
          bloodDiseases: resp.data.bloodDiseases,
          lungDiseases: resp.data.lungDiseases,
          rheumaticDiseases: resp.data.rheumaticDiseases,
          ophthalmicDiseases: resp.data.ophthalmicDiseases,
          cancers: resp.data.cancers,
          kidneyDisease: resp.data.kidneyDisease,
          liverDisease: resp.data.liverDisease,
          stroke: resp.data.stroke,
          epilepsy: resp.data.epilepsy,
          osteoporosis: resp.data.osteoporosis,
          aids: resp.data.aids,
          diabetes: resp.data.diabetes,
          allergyToAnesthetics: resp.data.allergyToAnesthetics,
          drugAllergy: resp.data.drugAllergy,
          allergyToDentalMaterials: resp.data.allergyToDentalMaterials,
          conditionsNotMentioned: resp.data.conditionsNotMentioned,
          takeMedications: resp.data.takeMedications,
          surgicalProcedures: resp.data.surgicalProcedures,
          cytostaticDrugs: resp.data.cytostaticDrugs,
          organTransplant: resp.data.organTransplant,
        });
      });
  };

  handleCheckboxChange = (questionName) => (event) => {
    if (event.target.checked)
      this.setState({
        [questionName]: event.target.value,
      });
    else if (!event.target.checked) {
      this.setState({
        [questionName]: "",
      });
    }
  };

  validateCheckboxes = (e) => {
    e.preventDefault();

    let allAnswersCompleted = true;
    this.questions.forEach((question, index) => {
      if (this.state[Object.keys(this.state)[index]] === "") {
        allAnswersCompleted = false;
      }
    });

    if (!allAnswersCompleted) {
      alert(
        "Proszę udzielić odpowiedzi na wszystkie pytania aby przejść dalej"
      );
    } else {
      if (!this.props.edit) {
        this.postQuestionnaireToApi();
      } else {
        this.putQuestionnaireToApi();
      }
    }
  };

  render() {
    const displayQuestions = this.questions.map((question, index) => {
      let stateValue = this.state[Object.keys(this.state)[index]];
      return (
        <Question
          key={question.id}
          answer={stateValue}
          question={question.question}
          handleCheckboxChange={this.handleCheckboxChange}
          questionName={question.shortName}
        />
      );
    });

    return (
      <div className="form-first-container">
        <div className="form-container ">
          <h1 className="title-questionnaire"> Ankieta zdrowotna </h1>
          <br />
          <h3>Czy stwierdzono u Pani/Pana następujące schorzenia:</h3>
          <hr />
          <hr />
          <Form id="htmlForm">
            {displayQuestions}
            <br /> <br />
            <Button
              variant="primary"
              type="submit"
              value="submit"
              onClick={this.validateCheckboxes}
            >
              {this.props.edit ? "Zakończ edycję" : "Zakończ ankietę"}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

function Question(props) {
  return (
    <div>
      <div
        className={`question${props.questionId}-container question-container`}
      >
        <h5>{props.question}</h5>
        <Form.Check
          type="checkbox"
          name="Yes"
          checked={props.answer === "Yes" ? true : false}
          value="Yes"
          label="Tak"
          onChange={props.handleCheckboxChange(props.questionName)}
        />
        <Form.Check
          type="checkbox"
          name="No"
          checked={props.answer === "No" ? true : false}
          value="No"
          label="Nie"
          onChange={props.handleCheckboxChange(props.questionName)}
        />
        <Form.Check
          type="checkbox"
          name="NotKnow"
          checked={props.answer === "NotKnow" ? true : false}
          value="NotKnow"
          label="Nie wiem"
          onChange={props.handleCheckboxChange(props.questionName)}
        />
        <hr />
      </div>
    </div>
  );
}
