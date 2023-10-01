import axiosInstance from "../../axios";
import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ConfirmModal from "../ConfirmModal";

const AdminPosts = (props) => {
    const {adminPosts} = props;
    const[isShow, setIsShow] = useState(false)
    const[confirmId,setConfirmId] = useState()
    const deletePost=(id)=>{
      setIsShow(!isShow)
      setConfirmId(id)
    }
    const onConfirm = (id) =>{
      axiosInstance.delete(`blog_api/admin/delete/${id}/`)
      .catch((error)=>{
        console.log(error.response)
      })
      .then((res)=>{
        setIsShow(!isShow)
          window.location.reload( )
      })
    }

    const onClose=()=>{
      setIsShow(!isShow)
    }

    const toggle = () => {
      setIsShow(!isShow)
    }
    if(!adminPosts || adminPosts.length === 0){
      return(
        <>
        <Button href={'/admin/create/'} className="main_button">New post</Button>
        <p>Can't find any posts, Sorry</p>
        </>
      )
    }
    return(
    <>
      <Button href={'/admin/create/'} className="main_button">New post</Button>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminPosts.map((item)=>(
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.category}</td>
              <td>{item.title}</td>
              <td>
                <td><Button href={'admin/edit/'+item.id}>Edit</Button></td>
                <td><Button onClick={() => deletePost(item.id)}>Delete</Button></td>
              </td>
            </tr>
            ))}
          </tbody>
      </Table>
      {isShow ? (
        <ConfirmModal
        id={confirmId}
        toggle={()=>toggle}
        headerText = "Delete Post"
        text="Are you sure you want to Delete this post?"
        onConfirm={onConfirm}
        onClose={onClose}
        />
      ):null}
    </>
    )
}

export default AdminPosts