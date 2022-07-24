import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div>
      <h1>Bienvenidos a mi pagina</h1>
      <Link to ="/home"> 
        <button className={styles.button__into}>ingresar</button>
      </Link>
    </div>
  );
}
