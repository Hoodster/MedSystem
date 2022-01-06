import React, { Component } from 'react';
import "./TileGallery.css";

export default class TileGallery extends Component {
    render() {
        return (
            <div className='tile-gallery'>
                {this.props.children}
            </div>
        )
    }
}
