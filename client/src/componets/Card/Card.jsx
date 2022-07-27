import React from 'react';
import style from './Card.module.css';

const Card = ({ name, genres, image, rating }) => {
  return (
    <div>
      <div className={style.image}>
        <img src={image} alt='' />
      </div>
      <h3>{name}</h3>
      <p>{genres}</p>
      <p>{rating}</p>
    </div>
  );
};

export default Card;
