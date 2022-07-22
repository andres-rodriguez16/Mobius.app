import './App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import LandingPage from './componets/landinPage/LandingPage';

function App() {
  return (
   <React.Fragment>
    <Route exact path="/" component={LandingPage} />   
   </React.Fragment>

  );
}

export default App;
