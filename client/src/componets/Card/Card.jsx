import React from 'react';
import style from './Card.module.css';

const Card = ({ name, genres, image, rating }) => {
  return (
    <div className={style.Card}>
      <div >
        <img className={style.image} src={image} alt='' />
        <div >
          <h3 className={style.card__title}>{name}</h3>
          <div class={style.card__description}>
          <p>{genres}</p>
          <p >{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
