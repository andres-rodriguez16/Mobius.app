import React from 'react';
import style from './Card.module.css';

const Card = ({ name, genres, image, rating, released }) => {
  return (
    <div className={style.Card}>
      <div>
        <img className={style.image} src={image} alt='' />
        <div>
          <h3 className={style.card__title}>{name}</h3>
          <div className={style.card__description}>
            {genres?.map((g, index) => {
              return g.name ? (
                <p className={style.genre} key={g.id}>{g.name}</p>
              ) : (
                <p className={style.genre} key={index + 1}>{g}</p>
              );
            })}
          </div>
          <div className={style.rating}>
            <p>★{rating}</p>
            <p className={style.fecha}>{released}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
