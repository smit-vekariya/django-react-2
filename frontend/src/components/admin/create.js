import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams } from 'react-router-dom'

export default function Create(){
    function slugify(string) {
        return string
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    }

    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        title:"",
        slug:"",
        excerpt:"",
        content:""
    })
    const [formData, updateFormData] = useState(initialFormData)

    const handleChange = (e) =>{
        if(e.target.name === "title"){
            updateFormData({...formData,
                 [e.target.name]:e.target.value.trim(),
                 ["slug"]:slugify(e.target.value.trim()),
            })
        }
        else{
            updateFormData({...formData, [e.target.name]:e.target.value.trim()})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.post('blog_api/admin/create/',{
            category:2,
            title:formData.title,
            slug:formData.slug,
            author:1,
            excerpt:formData.excerpt,
            content:formData.content
        }).then((res)=>{
            navigate('/admin')
        })

    }
    return(
         <main className="content">
        <div className="registerdiv">
            <h2 style={{textAlign:'center'}} className="fontfamily">Create post</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={handleChange} required/>
                </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Excerpt</Form.Label>
                    <Form.Control as="textarea" rows={3} name="excerpt" onChange={handleChange} required/>
                </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control type="text"  name="slug" value={formData.slug} onChange={handleChange} required/>
                </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} name="content" onChange={handleChange} required></Form.Control>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={handleSubmit} className="main_button" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
        </main>
    )

}