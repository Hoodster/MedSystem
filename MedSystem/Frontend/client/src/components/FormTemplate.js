import React from "react";
import '../css/FormTemplate.css'

class FormTemplate extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="form-container disp-center disp-vertical">
                <div className="form-title-container"> {this.props.title} </div>
                <div className="form-content-container"> {this.props.content} </div>
                <div className="form-options-container"> {this.props.options} </div>
            </div>
        )
    }
}

export default FormTemplate