import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Component.css'

const Posts = (props) =>{
    const {posts} = props;
    const [postData, setPostData] = useState()
    if (!posts || posts.length===0){
        return <p>Sorry, we can not find any Announcements!</p>
    };
    const postdata = posts["data"]
    return(
        <React.Fragment>
            <Container>
                {postdata.map((item) =>
                <Col className="d-flex" key={item.id} style={{margin:20}}>
                    <Card className="post_card flex-fill">
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text style={{height:"70px"}}>{item.content}</Card.Text>
                            <Button className="main_2_button" href={"post/"+item.id}>know more</Button>
                        </Card.Body>
                    </Card>
                </Col>
                )}
            </Container>
        </React.Fragment>
    )
}


export default Posts;