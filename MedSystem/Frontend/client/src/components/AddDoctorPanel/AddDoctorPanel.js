import axios from "axios";
import React, { Component } from "react";
import "./AddDoctorPanel.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import Dashboard from "../../views/Dashboard";

export default class AddDoctorPanel extends Component {
  state = {
    firstName: "",
    secondName: "",
    lastName: "",
    birthDate: "",
    pesel: "",
    email: "",
    phoneNumber: "",
    password: "",
    firstNameError: "",
    secondNameError: "",
    lastNameError: "",
    birthDateError: "",
    peselError: "",
    emailError: "",
    phoneNumberError: "",
    passwordError: "",
  };

  errors = {
    emptyDataError: "Proszę wypełnić powyższe pole",
    peselError: "Niepoprawny pesel",
    emailError: {
      nonAt: "Brak znaku @ w emailu",
      nonSignAfterAt: "Brak części maila po znaku @",
      nonSignBeforeAt: "Brak części maila przed znakiem @",
    },
    phoneNumberError: "Błędny numer telefonu",
    passwordError:
      "Hasło musi posiadać minimum 8 znaków oraz posiadać: wielką literę, znak specjalny, oraz cyfrę ! ",
  };

  handleFormOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getCurrentData = () => {
    let date = new Date();
    date = date.toISOString().split("T")[0];
    return date;
  };

  setTempalteDate = () => {
    this.setState({
      birthDate: this.getCurrentData(),
    });
  };

  componentDidMount() {
    this.setTempalteDate();
  }

  sendRequest = (object) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .post(`http://localhost:5000/api/doctor/create`, object, {
        headers: headers,
      })
      .then((resp) => {
        alert("Pomyślnie dodano lekarza do systemu");
        window.location.href = "/";
      });
  };

  isPeselValid = (pesel) => {
    const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const controlNumber = parseInt(pesel.substr(-1));
    let sum = 0;

    for (let i = 0; i < weight.length; i++) {
      sum += parseInt(pesel[i] * weight[i]);
    }

    return 10 - (sum % 10) === controlNumber;
  };

  handleSubmitRegistrationForm = (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const secondName = event.target.secondName.value;
    const lastName = event.target.lastName.value;
    const birthDate = event.target.birthDate.value;
    const pesel = event.target.pesel.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phoneNumber.value;
    const password = event.target.password.value;

    this.setErrorsToInput(firstName, "firstNameError");
    this.setErrorsToInput(lastName, "lastNameError");
    this.setErrorsToInput(birthDate, "birthDateError");
    this.setErrorsToInput(pesel, "peselError");
    this.setErrorsToInput(email, "emailError");
    this.setErrorsToInput(phoneNumber, "phoneNumberError");
    this.setErrorsToInput(password, "passwordError");

    setTimeout(() => {
      if (this.areAllInputsValid()) {
        const object = {
          firstName: firstName,
          secondName: secondName,
          lastName: lastName,
          password: password,
          birthDate: birthDate,
          phoneNumber: phoneNumber,
          pesel: pesel,
          email: email,
        };
        this.sendRequest(object);
      }
    }, 1000);
  };

  areAllInputsValid = () => {
    return (
      this.isEmpty(this.state.firstNameError) &&
      this.isEmpty(this.state.secondNameError) &&
      this.isEmpty(this.state.lastNameError) &&
      this.isEmpty(this.state.birthDateError) &&
      this.isEmpty(this.state.peselError) &&
      this.isEmpty(this.state.emailError) &&
      this.isEmpty(this.state.phoneNumberError) &&
      this.isEmpty(this.state.passwordError)
    );
  };

  isEmpty = (value) => {
    return value === "";
  };

  setErrorsToInput(value, statePropertyName) {
    if (value === "") {
      this.setState({
        [`${statePropertyName}`]: this.errors.emptyDataError,
      });
    } else {
      switch (statePropertyName) {
        case "peselError":
          this.setWrongPeselErrorToInput(value);
          break;
        case "emailError":
          this.setWrongEmailErrorToInput(value);
          break;
        case "phoneNumberError":
          this.setWrongPhoneNumberErrorToInput(value);
          break;
        case "passwordError":
          this.setWrongPasswordErrorToInput(value);
          break;
        default:
          this.setState({
            [`${statePropertyName}`]: "",
          });
      }
    }
  }

  setWrongPasswordErrorToInput(value) {
    if (value.length >= 8) {
      var pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+"
      );
      if (pattern.test(value)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError: this.errors.passwordError,
        });
      }
    } else {
      this.setState({
        passwordError: this.errors.passwordError,
      });
    }
  }

  setWrongPhoneNumberErrorToInput(value) {
    if (value.toString().length !== 9) {
      this.setState({
        phoneNumberError: this.errors.phoneNumberError,
      });
    } else {
      this.setState({
        phoneNumberError: "",
      });
    }
  }

  setWrongPeselErrorToInput(pesel) {
    if (!this.isPeselValid(pesel)) {
      this.setState({
        peselError: this.errors.peselError,
      });
    } else {
      this.setState({
        peselError: "",
      });
    }
  }

  setWrongEmailErrorToInput(value) {
    let isAt = false;
    let isSthBeforeAt = false;
    let isSthAfterAt = false;
    for (var i = 0; i < value.length; i++) {
      if (value[i] === "@") {
        isAt = true;
        let splitedValue = value.split("@");
        if (splitedValue[0] !== "") {
          isSthBeforeAt = true;
        }
        if (splitedValue[1] !== "") {
          isSthAfterAt = true;
        }
      }
    }
    if (!isAt) {
      this.setState({
        emailError: this.errors.emailError.nonAt,
      });
    } else {
      if (!isSthBeforeAt) {
        this.setState({
          emailError: this.errors.emailError.nonSignBeforeAt,
        });
      } else {
        if (!isSthAfterAt) {
          this.setState({
            emailError: this.errors.emailError.nonSignAfterAt,
          });
        } else {
          this.setState({
            emailError: "",
          });
        }
      }
    }
  }

  render() {
    const {
      firstName,
      secondName,
      lastName,
      birthDate,
      pesel,
      email,
      phoneNumber,
      password,
    } = this.state;

    return (
      <div className="add-doctor-container">
        <Dashboard>
          <h1 className="title">Dodaj Lekarza do Systemu</h1> <br />
          <Form onSubmit={this.handleSubmitRegistrationForm}>
            <Form.Group as={Row} className="mb-3" controlId="formFirstName">
              <Form.Label column sm="2">
                Imię:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="firstName"
                  placeholder="Imię"
                  type="text"
                  value={firstName}
                  onChange={this.handleFormOnChange}
                  maxLength={25}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.firstNameError}</p>

            <Form.Group as={Row} className="mb-3" controlId="formSecondName">
              <Form.Label column sm="2">
                Drugie imię:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="secondName"
                  placeholder="Drugie imię"
                  type="text"
                  value={secondName}
                  onChange={this.handleFormOnChange}
                  maxLength={25}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.secondNameError}</p>

            <Form.Group as={Row} className="mb-3" controlId="formLastName">
              <Form.Label column sm="2">
                Nazwisko:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="lastName"
                  lastname="lastName"
                  placeholder="Nazwisko"
                  type="text"
                  value={lastName}
                  onChange={this.handleFormOnChange}
                  maxLength={40}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.lastNameError}</p>

            <Form.Group as={Row} className="mb-3" controlId="formBirthday">
              <Form.Label column sm="2">
                Data urodzenia:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={this.handleFormOnChange}
                  max={this.getCurrentData()}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.birthDateError}</p>

            <Form.Group as={Row} className="mb-3" controlId="formPeselNumber">
              <Form.Label column sm="2">
                Numer PESEL:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="pesel"
                  type="text"
                  placeholder="Pesel"
                  value={pesel}
                  onChange={this.handleFormOnChange}
                  maxLength={11}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.peselError}</p>

            <Form.Group as={Row} className="mb-3" controlId="formEmailAdress">
              <Form.Label column sm="2">
                Adres email:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleFormOnChange}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.emailError}</p>

            <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
              <Form.Label column sm="2">
                Numer telefonu:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="phoneNumber"
                  type="number"
                  placeholder="999999999"
                  value={phoneNumber}
                  onChange={this.handleFormOnChange}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.phoneNumberError}</p>

            <Form.Group as={Row} className="mb-3" controlId="formPassword">
              <Form.Label column sm="2">
                Hasło:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleFormOnChange}
                  maxLength={40}
                />
              </Col>
            </Form.Group>
            <p className="errorMessage">{this.state.passwordError}</p>
            <Button variant="primary" type="submit" value="Submit">
              Zarejestruj
            </Button>
          </Form>
          {/* <form onSubmit={this.handleSubmitRegistrationForm}>
            <input
              name="firstName"
              placeholder="Imię"
              type="text"
              value={firstName}
              onChange={this.handleFormOnChange}
              maxLength={25}
            />
            <p className="errorMessage">{this.state.firstNameError}</p>
            <label htmlFor="secondName"> Drugie imię </label>
            <input
              name="secondName"
              placeholder="Drugie imię"
              type="text"
              value={secondName}
              onChange={this.handleFormOnChange}
              maxLength={25}
            />
            <p className="errorMessage">{this.state.secondNameError}</p>
            <label htmlFor="lastName"> Nazwisko </label>
            <input
              name="lastName"
              lastname="lastName"
              placeholder="Nazwisko"
              type="text"
              value={lastName}
              onChange={this.handleFormOnChange}
              maxLength={40}
            />
            <p className="errorMessage">{this.state.lastNameError}</p>
            <label htmlFor="birthDate"> Data urodzenia </label>
            <input
              name="birthDate"
              type="date"
              value={birthDate}
              onChange={this.handleFormOnChange}
              max={this.getCurrentData()}
            />
            <p className="errorMessage">{this.state.birthDateError}</p>
            <label htmlFor="pesel"> Pesel </label>
            <input
              name="pesel"
              type="text"
              placeholder="Pesel"
              value={pesel}
              onChange={this.handleFormOnChange}
              maxLength={11}
            />
            <p className="errorMessage">{this.state.peselError}</p>
            <label htmlFor="email"> Email </label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.handleFormOnChange}
            />
            <p className="errorMessage">{this.state.emailError}</p>
            <label htmlFor="phoneNumber"> Numer telefonu </label>
            <input
              name="phoneNumber"
              type="number"
              placeholder="999999999"
              value={phoneNumber}
              onChange={this.handleFormOnChange}
            />
            <p className="errorMessage">{this.state.phoneNumberError}</p>
            <label htmlFor="password"> Hasło </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleFormOnChange}
              maxLength={40}
            />
            <p className="errorMessage">{this.state.passwordError}</p>
            <button type="submit" value="Submit">
              Zarejestruj
            </button>
          </form> */}
        </Dashboard>
      </div>
    );
  }
}
