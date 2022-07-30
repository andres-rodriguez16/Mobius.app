
import React from 'react';
import { Route } from "react-router-dom"
import LandingPage from './componets/landinPage/LandingPage';
import Home from './componets/Home/Home';
import NavBar from "./componets/Navbar/Navbar"
import Details from './componets/Details/Details';
import Formulario from './componets/Formulario/Formulario';
import style from "./App.module.css"

function App() {
  return (
    <React.Fragment>
      <div className={style.background}>
        <div className={style.transparency}>
          <NavBar />
          <Route exact path="/" component={LandingPage} />
        </div>
      </div>
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={Details} />
      <Route exact path="/createVideogame" component={Formulario} />
    </React.Fragment>
  );
}

export default App;
