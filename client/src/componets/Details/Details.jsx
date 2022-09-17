import React from 'react';
import { getVideoGamePorId, clearDetails } from '../../redux/actions/action';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import s from './Details.module.css';
import loading from '../../img/loading-icon.gif';
const Details = () => {
  const { id } = useParams();
  const detailsVideoGames = useSelector(state => state.videoGameDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoGamePorId(id));
    return function () {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  if (Object.keys(detailsVideoGames).length === 0) {
    return (
      <div className={s.n}>
        <img className={s.loading} src={loading} alt='' />
      </div>
    );
  }

  return (
    <div>
      <h3 className={s.name}>{detailsVideoGames.name}</h3>
      <div className={s.container}>
        <p className={s.description__text}>{detailsVideoGames.description}</p>
        <div className={s.fecha}>
          <img className={s.img} src={detailsVideoGames.img} alt='' />
          <div className={s.info}>
          <p className={s.rating}> Ranting ★ {detailsVideoGames.rating}</p>
            <p className={s.lanzamiento}>
            Release date: {detailsVideoGames.released}
            </p>
            <section className={s.genres}>
            <p>Genres : {detailsVideoGames.Generos}</p>
          </section>
          <section className={s.platforms}>
            {detailsVideoGames.platforms}
          </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
