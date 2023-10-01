import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Apps from './Apps';
import Main from './main';
import './index.css';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";
// import * as serviceWorker from './serviceWorker';
import Header from './components/header.js'
import Footer from './components/footer.js'
// import Sidebar from './components/Sidebar.js'
import SignUp from './components/register'
import Login from './components/login'
import Logout from './components/logout'
import Single from './components/single'
import Admin from './Admin'
import Create from './components/admin/create'
import Edit from './components/admin/edit'
import Delete from './components/admin/delete'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {window.location.pathname !== "/register" && window.location.pathname !== "/login" ? (<Header />) : null}
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/apps' element={<Apps />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/post/:id' element={<Single />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/create' element={<Create/>} />
        <Route path='/admin/edit/:id' element={<Edit/>} />
        <Route path='/admin/delete/:id' element={<Delete/>} />

      </Routes>
    </Router>
    {window.location.pathname !== "/register" && window.location.pathname !== "/login" ? (<Footer />) : null}
  </React.StrictMode>
);
