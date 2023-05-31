import React, { useState } from "react";
import axiosInstance from '../axios'
import {useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SignUp(){
    const navigate = useNavigate ();
    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
    })
    const [formData, updateFormData] = useState(initialFormData)
    const handleChange = (e) =>{
        updateFormData({
            ...formData,
            [e.target.name]:e.target.value.trim()
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.post('user/register/',{
            email:formData.email,
            user_name:formData.username,
            password:formData.password,
        })
        .then((res)=> {
            navigate('/login')
        })
    }

    return (
        <main className="content">
        <div className="registerdiv">
            <h2 style={{textAlign:'center'}} className="fontfamily">REGISTER</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={handleChange} placeholder="Enter username" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" required/>
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleSubmit} className="main_button" type="submit">
                    Submit
                </Button>
                <p style={{textAlign:"right"}}><a href="\login">click hear</a> for login yourself</p>
                 </div>
            </Form>
        </div>
        </main>
    )
}

