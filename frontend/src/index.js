import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Apps from './Apps';
import Main from './main';
import './index.css';
// import * as serviceWorker from './serviceWorker';
// import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
// import Sidebar from './components/Sidebar.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    {/* <Apps /> */}
    <Main />
    <Footer />
  </React.StrictMode>
);