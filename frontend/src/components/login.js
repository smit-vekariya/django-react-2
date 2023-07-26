import React, { useState } from "react";
import axiosInstance from '../axios'
import {useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Login(){
    const navigate = useNavigate ();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    })
    const [formData, updateFormData] = useState(initialFormData)
    const handleChange = (e) =>{
        updateFormData({
            ...formData,
            [e.target.name]:e.target.value.trim()
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            await axiosInstance.post("blog_api/token/",{
                email:formData.email,
                password:formData.password,
            })
            .then((res)=>{
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);
                axiosInstance.defaults.headers["Authorization"]="JWT "+ res.data.access;
            });
            navigate('/main ')
        }
        catch(error){
             throw error;
        }
    }

    return (
        <main className="content">
        <div className="registerdiv">
            <h2 style={{textAlign:'center'}} className="fontfamily">Login</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={handleChange} name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChange} name="password" placeholder="Password" />
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleSubmit} size="lg" className="main_button" type="submit">
                    Login
                </Button>
                <p style={{textAlign:"right"}}><a href="\register">click hear</a> for Register yourself</p>
                </div>
            </Form>
        </div>
        </main>
    )
}

