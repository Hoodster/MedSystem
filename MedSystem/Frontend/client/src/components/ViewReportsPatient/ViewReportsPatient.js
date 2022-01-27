import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';
import Dashboard from '../../views/Dashboard'
import PDFGeneratorRaports from '../PDFGenerator/PDFGeneratorRaports/PDFGeneratorRaports';
import './ViewReportsPatient.css'

export default class ViewReportsPatient extends Component {

    state = {
        reports: []
    }

    componentDidMount() {
        this.getAllPatientReportsFromAPI();
    }

    getAllPatientReportsFromAPI = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        axios.get('http://localhost:5000/api/reports/getAllPatientReports', { headers: headers }).then(resp => {
            this.setState({
                reports: resp.data
            })
        })

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
                {renderReports.length !== 0 ? renderReports : <p>Nie masz jeszcze żadnego raportu w serwisie</p>}
            </Dashboard>
        )
    }
}
