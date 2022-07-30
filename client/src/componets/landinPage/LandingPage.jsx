import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div>
      <h3 className={styles.slogan} >Los mejores juegos a un click</h3>
      <p className={styles.description} >Möbius Games es la plataforma que reune los mejores títulos para que nunca pares de jugar.</p>
      <Link to ="/home"> 
        <button className={styles.button__into}>ingresar</button>
      </Link>
    </div>
  );
}
