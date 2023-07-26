import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, FormGroup, Label } from "reactstrap";
export default function ConfirmModal(props){
    const [toggle, setToggles] =useState(props.toggle)
    const {text} = props
    const {headerText} = props
    const {id} =props
    const confirm = e =>{
        e.preventDefault()
        const {onConfirm} = props
        onConfirm(id)
    }
    return(
        <Modal isOpen={toggle} toggle={toggle}>
            <ModalHeader toggle={toggle}>{headerText}</ModalHeader>
            <ModalBody>
                <FormGroup>
                        <Label>{text}</Label>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button>No</Button>
                <Button color="success" onClick={confirm}>Yes</Button>
            </ModalFooter>
        </Modal>
    )
}