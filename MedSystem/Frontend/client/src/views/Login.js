import axios from "axios";
import React from "react";
import "../css/Login.css";
import { Button, Form } from "react-bootstrap";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false,
  };

  handleFormOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    axios
      .post(`http://localhost:5000/api/account/signin`, {
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp.status === 200) {
          localStorage.setItem("token", resp.data.token);

          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };

          axios
            .get(`http://localhost:5000/api/account/`, { headers: headers })
            .then((resp) => {
              this.assignRoleToUser(resp);
              window.location.href = "/";
            });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
  };

  assignRoleToUser(resp) {
    if (!!resp.data.patientId) {
      localStorage.setItem("role", "patient");
    }
    if (!!resp.data.doctorId) {
      localStorage.setItem("role", "doctor");
    }
    if (!!resp.data.adminId) {
      localStorage.setItem("role", "admin");
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <h1 className="title">Logowanie</h1> <br />
        <Form onSubmit={this.handleSubmitForm}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Adres email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Wprowadź adres email"
              required
              name="email"
              onChange={this.handleFormOnChange}
            />
            <Form.Text className="text-muted">
              Pamiętaj, że nigdy nie udostępniamy Twoich danych innym serwisom.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wprowadź hasło"
              required
              name="password"
              onChange={this.handleFormOnChange}
            />
            <Form.Text muted>
              Twoje hasło musi mieć minimalną długość 8 znaków, zawierać
              conajmniej 1 małą i dużą literę, cyfrę oraz znak specjalny
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Zaloguj się
          </Button>
          <span className="signupSpan">
            Potrzebujesz <a href="./register">rejestracji</a>?
          </span>
        </Form>
        {this.state.error && (
          <p className="login-error">Niepoprawny login lub hasło</p>
        )}
      </div>
    );
  }
}

export default Login;
