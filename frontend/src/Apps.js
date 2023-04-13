import axios from 'axios';
import React, { useEffect, useState } from "react";
import Modal from "./components/Modals";

export default function Apps() {
  const baseUrl = "http://localhost:8000/api/tasks/"
  const [formData, setFormData] = useState({ title: "", description: "", is_complete: false })
  const [formAddEditData, setFormAddEditData] = useState()
  const [isShow, setIsShow] = useState(false)
  const [viewCompleted, setViewCompleted] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [search, setSearch] = useState('')
  const [previousUrl, setPreviousUrl] = useState()
  const [nextUrl, setNextUrl] = useState()

  const createTask = () => {
    setFormAddEditData(formData)
    setIsShow(!isShow)
  }

  const toggle = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    refreshList()
  }, [search]);

  const editItem = (item) => {
    setFormAddEditData(item)
    setIsShow(!isShow)
  }
  const refreshList = () => {
    axios.get(baseUrl + `?title=${search}&is_complete=${viewCompleted}`)
      .then(result => {
        setTaskList(result.data.results)
        setPreviousUrl(result.data.previous)
        setNextUrl(result.data.next)
      }
      )
      .catch(error => console.log(error))
  }

  const paginationHandler = (url) => {
    axios.get(url)
      .then(result => {
        setTaskList(result.data.results)
        setPreviousUrl(result.data.previous)
        setNextUrl(result.data.next)
      }
      ).catch(error => console.log(error))
  }

  function displayComplete(res) {
    axios.get(baseUrl + `?title=${search}&is_complete=${res}`)
      .then(result => {
        setTaskList(result.data.results)
        setPreviousUrl(result.data.previous)
        setNextUrl(result.data.next)
        setViewCompleted(res)
      })
      .catch(error => console.log(error))
  }

  const is_completeTask = (item) =>{
     if (item.id) {
      item.is_complete = !viewCompleted
      axios.put(baseUrl + `${item.id}/`, item).then((res) => refreshList()).catch(error => console.log(error))
      return;
    }
  }
  const handleSubmit = item => {
    toggle()
    if (item.id) {
      axios.put(baseUrl + `${item.id}/`, item).then((res) => refreshList()).catch(error => console.log(error))
    }
    else {
      axios.post(baseUrl, item).then((res) => refreshList()).catch(error => console.log(error));
    }

  }
  const deleteItem = (item) => {
    alert("Are you sure you want to delete?")
    axios.delete(baseUrl + `${item.id}/`).then((res) => refreshList()).catch(error => console.log(error))
  }


  const renderItems = () => {
    // const newItems = taskList.filter(task => task.is_complete === viewCompleted );
    const newItems = taskList
    return (
      newItems.map((item) => (
        <tr key={item.id}>
          <td><button onClick={() => is_completeTask(item)} className="btn btn-secondary"> {viewCompleted ? "Incomplate":"Complate"}</button></td>
          <td className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`} >{item.title}</td>
          <td className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`} >{item.description}</td>
          <td><button onClick={() => editItem(item)} className="btn btn-secondary mr-2">Edit</button></td>
          <td><button onClick={() => deleteItem(item)} className="btn btn-danger">Delete</button></td>
        </tr>
      ))
    );
  }

  return (
    <main className="content">
      <h1 className="text-success text-uppercase text-center my-4">React With Django</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="ard p-3">
            <div className="my-3 tab-list">
              <span onClick={() => displayComplete(true)} className={viewCompleted ? "active" : ""}>
                Complated
              </span>
              <span onClick={() => displayComplete(false)} className={viewCompleted ? "" : "active"}>
                Incomplated
              </span>
            </div>
            <div className="input-group w-60">
              <span className="input-group-text" id="basic-addon1">Search</span>
              <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Write Something" aria-label="Input group example" aria-describedby="basic-addon1" />
              <div style={{ margin: "0px 4px" }}>
                <button onClick={createTask} className="btn btn-primary">+ Add task</button>
              </div>
            </div><br></br>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Change</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {renderItems()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item"> <button className="page-link" onClick={() => paginationHandler(previousUrl)} tabIndex="-1">Previous</button></li>
          <li className="page-item"><button className="page-link" onClick={() => paginationHandler(nextUrl)}>Next</button></li>
        </ul>
      </nav>
      {isShow ? (
        <Modal
          activeItem={formAddEditData}
          toggle={() => toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  )
}