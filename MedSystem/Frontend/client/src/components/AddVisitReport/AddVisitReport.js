import axios from "axios";
import React, { Component } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import Dashboard from "../../views/Dashboard";

export default class AddVisitReport extends Component {
  state = {
    selectedDay: "",
    selectedVisit: "",
    allVisits: [],
  };

  componentDidMount() {
    this.setState({ selectedDay: this.getTodayDate() }, () => {
      this.getDoctorDayVisits();
    });
  }

  render() {
    const todayDate = this.getTodayDate();
    const renderVisits = this.state.allVisits.map((visit) => {
      return (
        <option key={visit.visitId} value={visit.visitId}>
          {visit.patient.user.firstName} {visit.patient.user.lastName}{" "}
          {visit.visitDateStart.split("T")[1].split("+")[0]}
        </option>
      );
    });

    return (
      <Dashboard title="Dodaj raport z wizyty">
        <Form.Control
          type="date"
          max={todayDate}
          value={this.state.selectedDay}
          onChange={this.handleSelectedDay}
          onKeyDown={e => e.preventDefault()}
        />
        <FloatingLabel controlId="floatingSelect" label="Wybierz pacjenta">
          <Form.Select
            aria-label="Floating label select"
            value={this.state.selectedVisit}
            onChange={this.handleChangedVisit}
          >
            <option hidden>
              Rozwiń, aby zobaczyć wizyty pacjentów z danego dnia
            </option>
            {renderVisits}
          </Form.Select>
        </FloatingLabel>
        {this.state.selectedVisit !== "" && (
          <div>
            <Form onSubmit={this.handleSubmitReport}>
              <Form.Group className="mb-3" controlId="reportTitle">
                <Form.Label>Tytuł raportu</Form.Label>
                <Form.Control
                  type="text"
                  name="reportTitle"
                  id="reportTitle"
                  placeholder="Wpisz tytuł raportu"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="reportBody">
                <Form.Label>Treść raportu medycznego</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reportBody"
                  id="reportBody"
                  placeholder="Wpisz treść raportu..."
                  rows={3}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Prześlij raport do bazy
              </Button>
            </Form>
          </div>
        )}
      </Dashboard>
    );
  }

  getTodayDate = () => {
    let todayDate = new Date().toISOString();
    let day = new Date(todayDate).getUTCDay();
    let newDay = this.changeDayToMondayIfDayIsWeekend(day);
    let distance = newDay - day;
    let newDate = new Date().setDate(new Date().getDate() + distance);
    todayDate = new Date(newDate).toISOString().split("T")[0];

    return todayDate;
  };

  changeDayToMondayIfDayIsWeekend(day) {
    let newDay;
    let saturdayIndex = 6;
    let sundayIndex = 0;
    if ([saturdayIndex, sundayIndex].includes(day)) {
      newDay = day + 1;
      if ([sundayIndex, sundayIndex].includes(newDay)) {
        newDay += 1;
      }
    } else {
      newDay = day;
    }
    return newDay;
  }

  handleSelectedDay = (event) => {
    this.setState({ selectedDay: event.target.value });
    let day = new Date(event.target.value).getUTCDay();
    if ([6, 0].includes(day)) {
      alert("Nie można umówić wizyty w weekend");
    } else {
      this.setState(
        {
          selectedDay: event.target.value,
        },
        () => {
          this.getDoctorDayVisits();
        }
      );
    }
  };

  getDoctorDayVisits = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(
        `http://localhost:5000/api/reports/getDoctorVisits?date=${this.state.selectedDay}`,
        { headers: headers }
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            allVisits: resp.data,
          });
        }
      });
  };

  handleChangedVisit = (event) => {
    this.setState({ selectedVisit: event.target.value });
  };

  handleSubmitReport = (event) => {
    event.preventDefault();

    let timezoneOffset = new Date().getTimezoneOffset() * 60000;
    let actualTime = new Date(Date.now() - timezoneOffset)
      .toISOString()
      .slice(0, -1);
    let reportTitle = event.target.reportTitle.value;
    let reportBody = event.target.reportBody.value.replaceAll("\n", "<br/>");
    let visitId = this.state.selectedVisit;

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const object = {
      reportTitle: reportTitle,
      reportBody: reportBody,
      reportDate: actualTime,
      visitId: visitId,
    };

    axios
      .post("http://localhost:5000/api/reports/addRaport", object, {
        headers: headers,
      })
      .then((resp) => {
        alert("Raport został pomyślnie wystawiony do systemu.");
        window.location.href = "/";
      });
  };
}
