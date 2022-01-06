import React, { Component } from "react";
import "./Questionnaire.css";
import axios from "axios";
import { questions } from "../../models/Questions";
export default class Questionnaire extends Component {
    constructor(props) {
        super(props)
        this.state = {
            heartDiseases: '',
            bloodDiseases: '',
            lungDiseases: '',
            rheumaticDiseases: '',
            ophthalmicDiseases: '',
            cancers: '',
            kidneyDisease: '',
            liverDisease: '',
            stroke: '',
            epilepsy: '',
            osteoporosis: '',
            aids: '',
            diabetes: '',
            allergyToAnesthetics: '',
            drugAllergy: '',
            allergyToDentalMaterials: '',
            conditionsNotMentioned: '',
            takeMedications: '',
            surgicalProcedures: '',
            cytostaticDrugs: '',
            organTransplant: '',
        }
    }

    questions = [...questions];


    componentDidMount() {
        if (this.props.edit) {
            this.getQuestionnaireAnswers();
        }
    }

    postQuestionnaireToApi = () => {
        let object = JSON.parse(JSON.stringify(this.state));
        object.patientId = localStorage.getItem("userId");

        axios.post('http://localhost:5000/api/patient/questionnaire', object)
            .then(resp => {

                axios.post('http://localhost:5000/api/account/signin', { email: localStorage.getItem("userEmail"), password: localStorage.getItem("userPassword") })
                    .then(resp => {

                        localStorage.setItem("token", resp.data.token);
                        localStorage.removeItem("userPassword");
                        localStorage.removeItem("userEmail");
                        localStorage.setItem("role", "patient");
                        window.location.href = "/";
                    })
            })
    }

    putQuestionnaireToApi = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        axios.put('http://localhost:5000/api/patient/questionnaire', this.state, { headers: headers }).then(resp => {
            alert("Pomyślnie uaktualniłeś ankietę!")
        })
    }

    getQuestionnaireAnswers = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        axios.get("http://localhost:5000/api/patient/questionnaire", { headers: headers }).then(resp => {
            this.setState({
                heartDiseases: resp.data.heartDiseases,
                bloodDiseases: resp.data.bloodDiseases,
                lungDiseases: resp.data.lungDiseases,
                rheumaticDiseases: resp.data.rheumaticDiseases,
                ophthalmicDiseases: resp.data.ophthalmicDiseases,
                cancers: resp.data.cancers,
                kidneyDisease: resp.data.kidneyDisease,
                liverDisease: resp.data.liverDisease,
                stroke: resp.data.stroke,
                epilepsy: resp.data.epilepsy,
                osteoporosis: resp.data.osteoporosis,
                aids: resp.data.aids,
                diabetes: resp.data.diabetes,
                allergyToAnesthetics: resp.data.allergyToAnesthetics,
                drugAllergy: resp.data.drugAllergy,
                allergyToDentalMaterials: resp.data.allergyToDentalMaterials,
                conditionsNotMentioned: resp.data.conditionsNotMentioned,
                takeMedications: resp.data.takeMedications,
                surgicalProcedures: resp.data.surgicalProcedures,
                cytostaticDrugs: resp.data.cytostaticDrugs,
                organTransplant: resp.data.organTransplant,
            })


        })
    }

    handleCheckboxChange = (questionName) => (event) => {
        if (event.target.checked)
            this.setState({
                [questionName]: event.target.value
            })
        else if (!event.target.checked) {
            this.setState({
                [questionName]: ''
            })
        }
    }

    validateCheckboxes = (e) => {
        e.preventDefault();

        let allAnswersCompleted = true;
        this.questions.forEach((question, index) => {
            if (this.state[Object.keys(this.state)[index]] === '') {
                allAnswersCompleted = false;
            }
        })

        if (!allAnswersCompleted) {

            alert("Proszę udzielić odpowiedzi na wszystkie pytania aby przejść dalej")
        }
        else {
            if (!this.props.edit) {
                this.postQuestionnaireToApi();
            }
            else {
                this.putQuestionnaireToApi();
            }

        }
    }

    render() {
        const displayQuestions = this.questions.map((question, index) => {
            let stateValue = this.state[Object.keys(this.state)[index]]
            return (
                <Question key={question.id} answer={stateValue} question={question.question} handleCheckboxChange={this.handleCheckboxChange} questionName={question.shortName} />
            )
        })

        return (
            <div>
                <div className="form-container ">
                    <h4 className="title-questionnaire"> Ankieta zdrowotna </h4>
                    <h5>Czy stwierdzono u Pani/Pana następujące schorzenia:</h5>
                    <form id="htmlForm">
                        {displayQuestions}
                        <button className="form-submit" type="submit" value="submit" onClick={this.validateCheckboxes}>{this.props.edit ? "Zakończ edycję" : "Zakończ ankiet"}</button>
                    </form>
                </div>
            </div>
        );
    }
}

function Question(props) {
    return (
        <div>
            <div className={`question${props.questionId}-container question-container`}>
                <p>{props.question}</p>
                <label htmlFor="inp-1">
                    <input type="checkbox" name="Yes" checked={props.answer === "Yes" ? true : false} value="Yes" onChange={props.handleCheckboxChange(props.questionName)} />
                    Tak
                </label>
                <label htmlFor="inp-2">
                    <input type="checkbox" name="No" checked={props.answer === "No" ? true : false} value="No" onChange={props.handleCheckboxChange(props.questionName)} />
                    Nie
                </label>
                <label htmlFor="inp-3">
                    <input type="checkbox" name="NotKnow" checked={props.answer === "NotKnow" ? true : false} value="NotKnow" onChange={props.handleCheckboxChange(props.questionName)} />
                    Nie wiem
                </label>
            </div>
        </div>
    )
}
