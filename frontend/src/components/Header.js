import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Header(){
    return(
        <React.Fragment>
            <Navbar style={{backgroundColor:"#001529"}} variant="dark" sticky="top">
                <Container>
                <Navbar.Brand href="#home">ReactDjango</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="\main">Main</Nav.Link>
                    <Nav.Link href="\apps">Apps</Nav.Link>
                </Nav>
                <div style={{float:"right"}}>
                    <Button style={{margin:5}} href="\register" className="main_button">Sign up</Button>
                    <Button variant="outline-light" href="\login" >Login</Button>
                    <Button style={{margin:5}} variant="outline-light" href="\logout">Logout</Button>
                </div>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}