import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Footer(){
    return(
        <React.Fragment>
            <Card className="text-center" style={{width:"100%", position:"fixed", bottom:0}}>
                <Card.Header style={{backgroundColor:"#FFDEAD"}}>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Footer style={{backgroundColor:"#FFDEAD"}} className="text-muted">Design by Smit Vekariya</Card.Footer>
            </Card>
        </React.Fragment>
    )

}