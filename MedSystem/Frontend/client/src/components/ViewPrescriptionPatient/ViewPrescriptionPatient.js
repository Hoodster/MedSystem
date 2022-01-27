import axios from 'axios'
import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';
import Dashboard from '../../views/Dashboard'
import { PDFDownloadLink } from '@react-pdf/renderer';
import './ViewPrescriptionPatient.css'
import PDFGeneratorPrescription from '../PDFGenerator/PDFGeneratorPrescription/PDFGeneratorPrescription';

export default class ViewPrescriptionPatient extends Component {

    state = {
        prescriptions: []
    }

    componentDidMount() {
        this.getAllPatientPrescriptionsFromAPI();
    }

    getAllPatientPrescriptionsFromAPI = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        axios.get('http://localhost:5000/api/prescription/getPatientPrescriptions', { headers: headers }).then(resp => {
            this.setState({
                prescriptions: resp.data
            })
        })

    }


    render() {
        const renderPrescriptions = this.state.prescriptions.map(prescription => {
            return (
                <Alert className='alertsPrescription' variant='dark' key={prescription.prescriptionId}>
                    <span>Kod recepty: {prescription.prescriptonCode}</span>
                    <span>Kod odbioru: {prescription.prescriptonReceiptCode}</span>
                    <span>Status: {prescription.prescriptionFulfilled ? "zrealizowana" : "do realizacji"}</span>
                    <PDFDownloadLink
                        document={
                            <PDFGeneratorPrescription
                                prescriptionNumber={prescription.prescriptonCode}
                                prescriptionReceiptCode={prescription.prescriptonReceiptCode}
                                prescriptionDescription={prescription.prescriptionDescription}
                            />
                        }
                        fileName={`Recepta-${prescription.prescriptionId}`}
                    >
                        {({ blob, url, loading, error }) => (loading ? 'Ładowanie opisu recepty...' : 'Pobierz pdf z pełnym opisem recepty')}
                    </PDFDownloadLink>
                </Alert>
            )
        })
        return (
            <Dashboard title="Twoje recepty">
                {renderPrescriptions.length !== 0 ? renderPrescriptions : <p>Nie masz jeszcze żadnej recepty w serwisie</p>}
            </Dashboard>
        )
    }
}
