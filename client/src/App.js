import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar"
import Auth from "./pages/Auth"
import Login from "./components/Login"
import About from "./pages/About"
import Home from "./pages/Home"

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
          <Route path="/app">
            <Auth />
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