import React, { useEffect, useState } from "react"
import axiosInstance from "../../axios"
import { useParams, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


export default function Edit(){
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
    const {id} = useParams()
    const initialFormData = Object.freeze({
        title:"",
        slug:"",
        excerpt:"",
        content:""
    })

    const navigate = useNavigate();
    const[formData , updateFormData] = useState(initialFormData)

    useEffect(() =>{
        axiosInstance.get('blog_api/admin/edit/postdetails/' + id +"/" ).then((res) => {
            updateFormData({...formData,
                ['title']:res.data.title,
                ['slug']:res.data.slug,
                ['excerpt']:res.data.excerpt,
                ['content']:res.data.content,
            })
        })
    }, [updateFormData])

    const handleChange = (e) =>{
        if(e.target.name === "title"){
            updateFormData({...formData,
                [e.target.name]:e.target.value,
                ['slug']:slugify(e.target.value.trim())
        })
        }else{
            updateFormData({...formData,[e.target.name]:e.target.value})
        }

    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        axiosInstance.put('blog_api/admin/edit/'+id+'/',{
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
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required/>
                </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Excerpt</Form.Label>
                    <Form.Control as="textarea" rows={3} name="excerpt" value={formData.excerpt} onChange={handleChange} required/>
                </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control type="text"  name="slug" value={formData.slug} onChange={handleChange} required/>
                </Form.Group>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} name="content" value={formData.content} onChange={handleChange} required></Form.Control>
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