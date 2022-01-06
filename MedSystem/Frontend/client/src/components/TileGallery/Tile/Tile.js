import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Tile.css'
export default function Tile(props) {
    return (
        <Card className="card-container">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <div className='tile-body'>
                    {props.children}
                </div>
                <Link className='btn btn-primary tile-button' to={props.redirectPath}> Zobacz</Link>
            </Card.Body>
        </Card>
    )
}
