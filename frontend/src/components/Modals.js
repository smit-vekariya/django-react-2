import React, { Component, useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label} from "reactstrap";

export default function CustomeModal(props){
    const [activeItem, setActiveItem] = useState(props.activeItem)
    const [toggles, setToggles] = useState(props.toggle)
    const [error, setError] = useState({})
    const handleChange = e =>{
        let {name, value} = e.target;
        if (e.target.type === "checkbox"){
            value = e.target.checked;
        }
        const activeItems = { ...activeItem, [name]: value };
        setActiveItem(activeItems);
    }

    function validationForm(){
        let valid = true
        let error = {}
        if(!activeItem.title){
            valid = false
            error["title"] = "Title is required"
        }
        if(!activeItem.description){
            valid = false
            error["description"] = "Description is required"
        }
        setError(error)
        return valid
    }

    const submitTask = e =>{
        e.preventDefault()
        const {onSave} = props
        if(validationForm()){
            onSave(activeItem)
        }

    }
    return(
        <Modal isOpen={true} toggle={toggles}>
            <ModalHeader toggle={toggles}>Task Item</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" value={activeItem.title} onChange={handleChange} placeholder="Enter task title"/>
                        {error.title ? <span style={{color:'red'}}>{error.title}</span>:""}
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" value={activeItem.description} onChange={handleChange} placeholder="Enter task description"/>
                        {error.description ? <span style={{color:'red'}}>{error.description}</span>:""}
                    </FormGroup>
                    <FormGroup>
                        <Label for="is_complete">
                            <Input type="checkbox" name="is_complete" checked={activeItem.is_complete} onChange={handleChange}></Input>
                            completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={submitTask}>Save</Button>
            </ModalFooter>
        </Modal>
    );

}
