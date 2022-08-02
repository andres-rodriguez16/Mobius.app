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
            {genres?.map((g, index )=>{ 
              return  g.name ? <p key={g.id}>{g.name}</p> : <p key={index + 1} >{g}</p>})}
          <p>{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
