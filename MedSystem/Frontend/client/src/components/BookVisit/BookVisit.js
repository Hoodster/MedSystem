import axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Dashboard from "../../views/Dashboard";
import { VisitsHours } from "../../models/VisitsHours";
import "./BookVisit.css";

export default class BookVisit extends Component {
  state = {
    dateValue: "",
    allDoctors: [],
    selectedDoctor: "",
    visits: [],
    hourSelected: "",
  };

  VisitsHours = [...VisitsHours];
  componentDidMount() {
    this.setState({ dateValue: this.getTodayDate() });
    this.getAllDoctors();
  }

  render() {
    const todayDate = this.getTodayDate();
    const renderDoctorsOptions = this.state.allDoctors.map((doctor) => {
      return (
        <option key={doctor.id} value={doctor.doctorId}>
          {doctor.firstName + " " + doctor.lastName}
        </option>
      );
    });
    let freeVisits = this.adjustRenderVisitHoursToDayTime(VisitsHours);
    freeVisits = this.adjustRenderVisitHoursToFreeTerms(freeVisits);
    const renderFreeVisits =
      freeVisits.length === 0 ? (
        <span>Brak dostępnych terminów</span>
      ) : (
        freeVisits.map((hour, index) => {
          return (
            <Button
              className="btn-visit"
              variant="outline-secondary"
              size="lg"
              key={index}
              name={hour.time}
              onClick={this.handleHourTime}
            >
              Termin: {this.state.dateValue} Godzina: {hour.time}
            </Button>
          );
        })
      );

    return (
      <Dashboard title="Zarezerwuj wizytę u specjalisty">
        <p>Wybierz specjalistę - lekarza: </p>
        <Form.Select
          className="SelectDoctorName"
          value={this.state.selectedDoctor}
          onChange={this.handleSelectDoctor}
        >
          <option hidden>Wybierz...</option>
          {renderDoctorsOptions}
        </Form.Select>
        {this.state.selectedDoctor !== "" && (
          <p>Wybierz pasującą Ci datę wizyty</p>
        )}
        {this.state.selectedDoctor !== "" && (
          <Form.Control
            type="date"
            min={todayDate}
            value={this.state.dateValue}
            onChange={this.handleSelectDate}
            onKeyDown={e => e.preventDefault()}
          />
        )}
        {this.state.selectedDoctor !== "" && <p>Poniżej dostępne terminy: </p>}
        {this.state.selectedDoctor !== "" && (
          <div className="visits-container">{renderFreeVisits}</div>
        )}
        {this.state.hourSelected !== "" && (
          <p>
            Wybrano termin wizyty: {this.state.dateValue} o godzinie:{" "}
            {this.state.hourSelected}.
          </p>
        )}
        {this.state.hourSelected !== "" && (
          <p>Czy potwierdzasz termin wizyty ?</p>
        )}
        {this.state.hourSelected !== "" && (
          <Button variant="outline-success" onClick={this.handleBookVisit}>
            Potwierdzam
          </Button>
        )}
      </Dashboard>
    );
  }

  getAllDoctors = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("http://localhost:5000/api/doctor/doctorslist", { headers: headers })
      .then((resp) => {
        let doctorList = [];
        resp.data.forEach((doctor) => {
          doctorList.push(doctor.user);
        });
        this.setState({ allDoctors: doctorList });
      });
  };

  getDoctorDayVisits = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(
        `http://localhost:5000/api/visits/getAllDoctorVisitsInDay?doctorId=${this.state.selectedDoctor}&date=${this.state.dateValue}`,
        { headers: headers }
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            visits: resp.data,
          });
        }
      });
  };

  handleSelectDoctor = (event) => {
    this.setState(
      {
        selectedDoctor: event.target.value,
      },
      () => {
        this.getDoctorDayVisits();
      }
    );
  };

  getTodayDate = () => {
    let todayDate = new Date().toISOString();
    let day = new Date(todayDate).getUTCDay();
    let newDay = this.changeDayToMondayIfDayIsWeekend(day);
    let distance = newDay - day;
    let newDate = new Date().setDate(new Date().getDate() + distance);
    todayDate = new Date(newDate).toISOString().split("T")[0];

    return todayDate;
  };

  handleSelectDate = (event) => {
    let day = new Date(event.target.value).getUTCDay();
    if ([6, 0].includes(day)) {
      alert("Nie można umówić wizyty w weekend");
    } else {
      this.setState(
        {
          dateValue: event.target.value,
        },
        () => {
          this.getDoctorDayVisits();
        }
      );
    }
  };

  handleHourTime = (event) => {
    let time = event.target.name;
    this.setState({
      hourSelected: time,
    });
  };

  adjustRenderVisitHoursToFreeTerms = (visits) => {
    let reservedVisited = [...this.state.visits];
    let copyVisitsArray = JSON.parse(JSON.stringify(visits));

    for (var i = 0; i < copyVisitsArray.length; i++) {
      reservedVisited.forEach((reserved) => {
        let reservedTime = reserved.visitDateStart.split("T")[1];
        reservedTime = reservedTime.slice(0, 5);
        console.log(copyVisitsArray[i], i);
        if (reservedTime === copyVisitsArray[i].time) {
          copyVisitsArray.splice(i, 1);
          i > 0 && i--;
        }
      });
    }
    return copyVisitsArray;
  };

  adjustRenderVisitHoursToDayTime = (visits) => {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    let copyVisitsArray = JSON.parse(JSON.stringify(visits));

    if (today.toISOString().split("T")[0] === this.state.dateValue) {
      for (var i = 0; i < copyVisitsArray.length; i++) {
        let visitHour = copyVisitsArray[i].time.split(":")[0];
        let visitMinutes = copyVisitsArray[i].time.split(":")[1];
        if (parseInt(visitHour) < parseInt(hours)) {
          copyVisitsArray.splice(i, 1);
          i--;
        }
        if (
          parseInt(visitHour) === parseInt(hours) &&
          parseInt(minutes) > parseInt(visitMinutes)
        ) {
          copyVisitsArray.splice(i, 1);
          i--;
        }
      }
    }
    return copyVisitsArray;
  };

  handleBookVisit = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let time = this.state.hourSelected.split(":");
    let hour = time[0];
    let minutes = time[1];
    let date = this.state.dateValue.split("-");
    let year = date[0];
    let month = date[1];
    let day = date[2];

    let object = {
      visitDateStart: `${year}-${month}-${day}T${hour}:${minutes}`,
      doctorId: this.state.selectedDoctor,
    };

    axios
      .post("http://localhost:5000/api/visits/addVisit", object, {
        headers: headers,
      })
      .then((resp) => {
        alert("Udało umówić się na wizytę !");
        window.location.href = "/";
      });
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
}
