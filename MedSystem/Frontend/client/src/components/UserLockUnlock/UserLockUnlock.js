import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Dashboard from "../../views/Dashboard";
import "./UserLockUnlock.css";

export default class UserLockUnlock extends Component {
  state = {
    userEmail: "",
    userInfoActive: false,
    user: "",
  };

  render() {
    const { user, userInfoActive, userEmail } = this.state;

    return (
      <Dashboard>
        <div className="userAccountServiceContainer">
          <Container>
            <h1 className="title">Zablokuj lub odblokuj użytkownika</h1> <br />
            <br />
            <Form>
              <h2>Wpisz adres email użytkownika:</h2> <br />
              <Form.Group as={Row} className="mb-3" controlId="formEmailAdress">
                <Form.Label column sm="2">
                  Adres email:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    onChange={this.handleUserEmailOnChange}
                    value={userEmail}
                    placeholder="adres@email.com"
                  />
                </Col>
              </Form.Group>
              <Button onClick={this.handleFindUserButton}>
                Znajdź użytkownika
              </Button>
            </Form>
            <br />
            <br />
            {userInfoActive && (
              <Form>
                <>
                  {user.lockoutEnd === null ? (
                    <>
                      <h3>
                        Czy napewno chcesz zablokować poniższego użytkownika?
                      </h3>
                      <br />
                    </>
                  ) : (
                    <>
                      <h3>
                        Czy napewno chcesz odblokować poniższego użytkownika?
                      </h3>
                      <br />
                    </>
                  )}

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formFirstName"
                  >
                    <Form.Label column sm="2">
                      Imię:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        aria-label="Disabled input example"
                        readOnly
                        defaultValue={user.firstName}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formLastName"
                  >
                    <Form.Label column sm="2">
                      Nazwisko:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        aria-label="Disabled input example"
                        readOnly
                        defaultValue={user.lastName}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPeselNumber"
                  >
                    <Form.Label column sm="2">
                      Numer PESEL:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        aria-label="Disabled input example"
                        readOnly
                        defaultValue={user.pesel}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPhoneNumber"
                  >
                    <Form.Label column sm="2">
                      Numer telefonu:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        aria-label="Disabled input example"
                        readOnly
                        defaultValue={user.phoneNumber}
                      />
                    </Col>
                  </Form.Group>

                  {user.lockoutEnd === null ? (
                    <Button onClick={this.handleLockUser}>Zablokuj</Button>
                  ) : (
                    <Button onClick={this.handleUnlockUser}>Odblokuj</Button>
                  )}
                </>
              </Form>
            )}
          </Container>
        </div>
      </Dashboard>
    );
  }

  handleFindUserButton = () => {
    if (this.state.userEmail !== "") {
      this.getUserFromApi();
    } else {
      alert("Proszę wypełnić adres email");
    }
  };

  handleUserEmailOnChange = (event) => {
    this.setState({ userEmail: event.target.value });
  };

  getUserFromApi = () => {
    let email = this.state.userEmail;
    email = email.replaceAll("@", "%40");

    axios
      .get(`http://localhost:5000/api/account/getUserByMail?email=${email}`)
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            userInfoActive: true,
            user: resp.data,
          });
        } else {
          alert("Użytkownik o podanym adresie email nie istnieje");
        }
      })
      .catch((error) => {
        alert("Nie udało się znaleść użytkownika,spróbuj ponownie później");
      });
  };

  handleLockUser = () => {
    let email = this.state.user.email;
    email = email.replaceAll("@", "%40");

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .post(
        `http://localhost:5000/api/account/lockUser?email=${email}`,
        {},
        { headers: headers }
      )
      .then((resp) => {
        alert("Pomyślnie zablokowano użytkownika");
        this.setState({
          user: "",
          userEmail: "",
          userInfoActive: false,
        });
      })
      .catch((error) => {
        alert(
          "Nie udało się zablokować użytkownika, sprawdź dane i spróbuj ponownie"
        );
      });
  };

  handleUnlockUser = () => {
    let email = this.state.user.email;
    email.replaceAll("@", "%40");

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .post(
        `http://localhost:5000/api/account/unlockUser?email=${email}`,
        {},
        { headers: headers }
      )
      .then((resp) => {
        alert("Pomyślnie odblokowano użytkownika");
        this.setState({
          user: "",
          userEmail: "",
          userInfoActive: false,
        });
      })
      .catch((error) => {
        alert(
          "Nie udało się odblokować użytkownika, sprawdź dane i spróbuj ponownie"
        );
      });
  };
}
