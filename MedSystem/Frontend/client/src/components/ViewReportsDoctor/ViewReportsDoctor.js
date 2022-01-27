import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import React, { Component } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import Dashboard from '../../views/Dashboard'
import PDFGeneratorRaports from '../PDFGenerator/PDFGeneratorRaports/PDFGeneratorRaports';
import './ViewReportsDoctor.css'

export default class ViewReportsDoctor extends Component {
    state = {
        pesel: "",
        reports: [],
    }

    render() {
        const renderReports = this.state.reports.map(report => {
            let dateTime = report.reportDate.split("T");
            let date = dateTime[0];
            let time = dateTime[1].split(".")[0];
            return (
                <Alert className='alertsRaports' variant='dark' key={report.raportId}>
                    <span>Data: {date} {time}</span>
                    <span>Tytuł: {report.reportTitle}</span>
                    <PDFDownloadLink
                        document={
                            <PDFGeneratorRaports
                                raportTitle={report.reportTitle}
                                raportDate={date + " " + time}
                                raportBody={report.reportBody}
                            />
                        }
                        fileName={`Raport-${report.raportId}`}
                    >
                        {({ blob, url, loading, error }) => (loading ? 'Ładowanie opisu raportu...' : 'Pobierz pdf z pełnym opisem raportu')}
                    </PDFDownloadLink>
                </Alert>
            )
        })

        return (
            <Dashboard title="Raporty">
                <Form.Group className="mb-3" >
                    <Form.Label>Podaj pesel pacjenta</Form.Label>
                    <Form.Control type="text" placeholder="Wpisz pesel pacjenta" onChange={this.handlePeselInputOnChange} value={this.state.pesel} />
                </Form.Group>
                <Button className='findReportButton' onClick={this.getPatientRaportByPesel}>Znajdź raporty</Button>
                {this.state.reports.length !== 0 && renderReports}
            </Dashboard>
        )
    }

    handlePeselInputOnChange = (event) => {
        this.setState({
            pesel: event.target.value
        })
    }

    getPatientRaportByPesel = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        axios.get(`http://localhost:5000/api/reports/getPatientReportByPesel?pesel=${this.state.pesel}`, { headers: headers }).then(resp => {
            if (resp.data.length === 0) {
                alert("Wybrany pacjent nie ma jeszcze raportu w systemie")
            }
            else {
                this.setState({ reports: resp.data });
            }
        })
            .catch(error => {
                alert("Wpisany pesel nie należy do żadnego pacjenta w sytemie")
            })
    }
}
