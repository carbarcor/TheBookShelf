import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'

// Entrypoint för applikationen
// Renderar root-komponenten av React-applikationen till DOM:en
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
    
  </React.StrictMode>,
);