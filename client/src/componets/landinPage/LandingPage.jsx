import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import img from '../../img/buttongo.png';
import l from '../../img/landing.gif';

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div>
        <h3 className={styles.slogan}>Los mejores juegos a un click</h3>
        <p className={styles.description}>
          Möbius Games es la plataforma que reune los mejores títulos para que
          nunca pares de jugar.
        </p>
        <Link to='/home'>
          <button className={styles.button__into}>
            <img src={img} alt='soy el boton'></img>
          </button>
        </Link>
      </div>
      <div>
        <img src={l} alt='' />
      </div>
    </div>
  );
}
