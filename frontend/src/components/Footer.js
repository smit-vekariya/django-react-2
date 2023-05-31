import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Footer(){
    return(
        <React.Fragment>
            <Card className="text-center footer" style={{width:"100%", bottom:0}}>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button className="main_button">Go somewhere</Button>
                </Card.Body>
                <Card.Footer className="text-muted">Design by Smit Vekariya</Card.Footer>
            </Card>
        </React.Fragment>
    )

}