import React, { Component } from 'react'
import "./Footer.css"

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div className="footer-container" />
                <div className='footer-children'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
