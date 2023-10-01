import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Single(){
    const {id} = useParams()
    const[data, setData] = useState({posts:[]})

    useEffect(()=>{
        axiosInstance.get(`blog_api/get_blog/${id}`).then((res)=>{
            setData({posts:res.data[0]})
        }).catch((error) =>{console.log(error)});
    }, [setData])

    return(
        <>
        <React.Fragment>
            <Container>
                <Card style={{ width: '18rem' }}>
                    <Card.Header><b>{data.posts.title}</b></Card.Header>
                    <ListGroup variant="flush">
                    <ListGroup.Item>{data.posts.content}</ListGroup.Item>
                    <ListGroup.Item>{data.posts.excerpt}</ListGroup.Item>
                    <ListGroup.Item>{data.posts.author}</ListGroup.Item>
                    <ListGroup.Item>{data.posts.category}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Container>
          </React.Fragment>
        </>
    )

}