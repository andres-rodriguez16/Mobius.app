import './App.css';
import React from 'react';
import { Route } from "react-router-dom"
import LandingPage from './componets/landinPage/LandingPage';
import Home from './componets/Home/Home';
import NavBar from "./componets/Navbar/Navbar"
import Details from './componets/Details/Details';

function App() {
  return (
   <React.Fragment>
    <NavBar />  
    <Route exact path="/" component={LandingPage} /> 
    <Route exact path="/home" component={Home} />
    <Route exact path="/home/:id" component={Details} /> 
   </React.Fragment>
  );
}

export default App;
