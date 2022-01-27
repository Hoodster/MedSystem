import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Dashboard from '../../views/Dashboard';


export default class AddPrescriptions extends Component {
    render() {
        return (
            <Dashboard title="Przepisz receptę do systemu">
                <Form onSubmit={this.handleSubmitPrescription}>
                    <Form.Group className="mb-3">
                        <Form.Label>Pesel pacjenta</Form.Label>
                        <Form.Control type="text" name='pesel' placeholder="Numer Pesel" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Numer recepty</Form.Label>
                        <Form.Control name="prescriptionNumber" type="text" placeholder="Numer wystawionej recepty" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Kod odbioru recepty</Form.Label>
                        <Form.Control type='text' name="prescriptionCode" placeholder="0000" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dawkowanie leków</Form.Label>
                        <Form.Control as="textarea" name="prescriptionDescription" rows={9} />
                    </Form.Group>
                    <Button type="submit">Zapisz receptę w systemie</Button>
                </Form>
            </Dashboard>
        )
    }

    handleSubmitPrescription = (event) => {
        event.preventDefault();
        let prescriptionReceiptCode = event.target.prescriptionCode.value;
        let prescriptionCode = event.target.prescriptionNumber.value;
        let prescriptionDescription = event.target.prescriptionDescription.value.replaceAll("\n", "<br/>");
        let pesel = event.target.pesel.value;

        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        axios.get(`http://localhost:5000/api/patient/getPatientByPesel?pesel=${pesel}`, { headers: headers }).then(resp => {
            let patientId = resp.data[0].patientId;
            const object = { patientId: patientId, prescriptonCode: prescriptionCode, prescriptonReceiptCode: prescriptionReceiptCode, prescriptionDescription: prescriptionDescription }
            console.log(object);
            if (resp.data.length !== 0) {
                axios.post('http://localhost:5000/api/prescription/addPrescription', object, { headers: headers }).then(resp => {
                    alert("Recepta przeniesiona do systemu");
                    window.location.href = "/";
                })
            }
            else {
                alert("Nie udało się wystawic recepty! sprawdź pesel pacjenta i spróbuj ponownie")
            }

        }).catch(error => {
            alert("Nie udało się wystawic recepty!  sprawdź pesel pacjenta i spróbuj ponownie")
        })
    }
}
