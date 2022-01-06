import axios from "axios";
import React from "react";
import "../css/Login.css";
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

    axios.post(`http://localhost:5000/api/account/signin`, { email: email, password: password }).then(resp => {
      if (resp.status === 200) {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("role", "patient");
        window.location.href = "/";
      }
    })
      .catch((error) => {
        this.setState({
          error: true
        })
      })
  }

  render() {
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.handleSubmitForm}>
          <h3>Zaloguj się</h3>
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            required
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleFormOnChange}
          />
          <label className="login-label" htmlFor="password">
            Hasło
          </label>
          <input
            required
            className="login-input"
            name="password"
            type="password"
            placeholder="Hasło"
            onChange={this.handleFormOnChange}
          />
          {this.state.error && <p className="login-error">Niepoprawny login lub hasło</p>}
          <input className="login-button" type="submit" value="Zaloguj" />

          <p>
            Potrzebujesz <a href="./register">rejestracji</a>?
          </p>
          <p>
            <a href="./">Nie pamiętasz hasła?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
