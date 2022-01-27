import axios from 'axios'
import React, { Component } from 'react'
import { Accordion, Alert } from 'react-bootstrap'
import Dashboard from '../../views/Dashboard'
import "./ViewVisits.css"

export default class ViewVisits extends Component {
    state = {
        allVisits: [],
    }
    componentDidMount() {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        if (this.props.role === "doctor")
            axios.get('http://localhost:5000/api/visits/getAllDoctorVisits', { headers: headers }).then(resp => {
                this.setState({
                    allVisits: resp.data
                })
            })
        if (this.props.role === "patient")
            axios.get('http://localhost:5000/api/visits/getAllPatientVisits', { headers: headers }).then(resp => {
                this.setState({
                    allVisits: resp.data
                })
            })
    }

    render() {
        const todayDate = new Date();
        const completedVisits = this.state.allVisits.filter(visit => (new Date(visit.visitDateStart) < todayDate));
        const futureVisits = this.state.allVisits.filter(visit => (new Date(visit.visitDateStart) > todayDate));
        const renderCompletedVisitis = this.props.role === "doctor"
            ?
            completedVisits.map(visit => {
                let visitDateTime = visit.visitDateStart.split("T");
                let visitTime = visitDateTime[1].split("+")[0];
                return (
                    <Alert className='alertVisit' key={visit.visitId} variant='dark'>
                        <span>{visitDateTime[0]}</span>
                        <span>{visitTime}</span>
                        <span>{visit.patient.user.firstName} {visit.patient.user.lastName}</span>
                    </Alert>
                );
            })
            :
            completedVisits.map(visit => {
                let visitDateTime = visit.visitDateStart.split("T");
                let visitTime = visitDateTime[1].split("+")[0];
                return (
                    <Alert className='alertVisit' key={visit.visitId} variant='dark'>
                        <span>{visitDateTime[0]}</span>
                        <span>{visitTime}</span>
                        <span>{visit.doctor.user.firstName} {visit.doctor.user.lastName}</span>
                    </Alert>
                );
            });
        const renderFutureVisitis = this.props.role === "doctor"
            ?
            futureVisits.map(visit => {
                let visitDateTime = visit.visitDateStart.split("T");
                let visitTime = visitDateTime[1].split("+")[0];
                return (
                    <Alert className='alertVisit' key={visit.visitId} variant='dark'>
                        <span>{visitDateTime[0]}</span>
                        <span>{visitTime}</span>
                        <span>{visit.patient.user.firstName} {visit.patient.user.lastName}</span>
                    </Alert>
                );
            })
            :
            futureVisits.map(visit => {
                let visitDateTime = visit.visitDateStart.split("T");
                let visitTime = visitDateTime[1].split("+")[0];
                return (
                    <Alert className='alertVisit' key={visit.visitId} variant='dark'>
                        <span>{visitDateTime[0]}</span>
                        <span>{visitTime}</span>
                        <span>{visit.doctor.user.firstName} {visit.doctor.user.lastName}</span>
                    </Alert>
                );
            });

        console.log(futureVisits);
        return (
            <Dashboard title="Terminy wizyt" >
                <Accordion defaultActiveKey='1' >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Odbyte wizyty</Accordion.Header>
                        <Accordion.Body>
                            {renderCompletedVisitis}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header >Planowane wizyty</Accordion.Header>
                        <Accordion.Body>
                            {renderFutureVisitis}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Dashboard>
        )
    }
}
