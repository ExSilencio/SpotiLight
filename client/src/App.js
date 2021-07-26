import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios'

// Components
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

// Assets
import band from "./images/band.mp4"

//const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return(
    <>
      <video autoPlay muted loop id="bgVideo">
        <source src={band} type="video/mp4" />
      </video>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/app">
          <Dashboard />
                     
          </Route>
          <Route path="/about">
              <About />
          </Route>
        </Switch>
      </Router>
    </>
  )
}


export default App

// 