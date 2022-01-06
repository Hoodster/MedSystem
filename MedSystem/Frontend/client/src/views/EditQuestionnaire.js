import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import Navigation from '../components/Navigation/Navigation'
import Questionnaire from '../components/Questionnaire/Questionnaire'

export default class EditQuestionnaire extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Container>
                    <Questionnaire edit={true} />
                </Container>
                <Footer>
                    <span>© Copyright - MedSystem  Wszelkie prawa zastrzeżone. </span>
                </Footer>
            </div>
        )
    }
}
