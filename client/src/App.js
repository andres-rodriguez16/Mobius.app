import './App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import LandingPage from './componets/landinPage/LandingPage';
import Home from './componets/Home/Home';
import NavBar from "./componets/Navbar/Navbar"


function App() {
  return (
   <React.Fragment>
    <NavBar />
    <Route exact path="/" component={LandingPage} /> 
    <Route  path="/home" component={Home} />
   </React.Fragment>

  );
}

export default App;
