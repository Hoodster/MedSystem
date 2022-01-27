import axios from 'axios'
import React, { Component } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import Dashboard from '../../views/Dashboard'
import PDFGeneratorPrescription from '../PDFGenerator/PDFGeneratorPrescription/PDFGeneratorPrescription'
import { PDFDownloadLink } from '@react-pdf/renderer';
import './ViewPrescriptionDoctor.css'

export default class ViewPrescriptionDoctor extends Component {
    state = {
        pesel: "",
        prescriptions: [],
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
            <Dashboard>
                <Form.Group className="mb-3" >
                    <Form.Label>Podaj pesel pacjenta</Form.Label>
                    <Form.Control type="text" placeholder="Wpisz pesel pacjenta" onChange={this.handlePeselInputOnChange} value={this.state.pesel} />
                </Form.Group>
                <Button className='findPrescriptionButton' onClick={this.getAllPatientsPrescriptions}>Znajdź recepty</Button>
                {this.state.prescriptions.length !== 0 && renderPrescriptions}
            </Dashboard>
        )
    }

    handlePeselInputOnChange = (event) => {
        this.setState({
            pesel: event.target.value
        })
    }

    getAllPatientsPrescriptions = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        axios.get(`http://localhost:5000/api/prescription/getDoctorPrescriptionsByPatientPesel?patientPesel=${this.state.pesel}`, { headers: headers }).then(resp => {
            if (resp.data.length === 0) {
                alert("Wybrany pacjent nie ma jeszcze recept w systemie")
            }
            else {
                this.setState({ prescriptions: resp.data });
            }
        })
            .catch(error => {
                alert("Wpisany pesel nie należy do żadnego pacjenta w sytemie")
            })
    }
}
