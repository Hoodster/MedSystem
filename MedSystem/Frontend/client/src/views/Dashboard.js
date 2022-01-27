import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer/Footer";
import "./Dashboard.css";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Container>
          <h1 className="title">{this.props.title}</h1>
          {this.props.children}
        </Container>
        <Footer>
          <span>© Copyright - MedSystem Wszelkie prawa zastrzeżone. </span>
        </Footer>
      </div>
    );
  }
}

export default Dashboard;
