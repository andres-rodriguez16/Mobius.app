import React from 'react';
import { getVideoGamePorId, clearDetails } from '../../redux/actions/action';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import s from './Details.module.css';

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

  return (
    <div>
      <h3 className={s.name}>{detailsVideoGames.name}</h3>
      <div className={s.container}>
        <img className={s.img} src={detailsVideoGames.img} alt='' />
        <p className={s.description__text}>{detailsVideoGames.description}</p> 
      </div>
      <div>
        <div className={s.fecha}>
        <p className={s.rating}>Ranting: ★ {detailsVideoGames.rating}</p>
        <br />
        <p className={s.lanzamiento}>
          Fecha de lanzamiento: {detailsVideoGames.released}
        </p>
        </div>
        <div>
        <section className={s.genres}>
          <p>Generos :</p>
          <ul>
            {detailsVideoGames.Generos?.map(p =>
              p.name ? <li key={p.id}>{p.name}</li> : <li key={p}>{p}</li>
            )}
          </ul>
        </section>
        <section className={s.platforms}>
          <p>Plataformas : </p>
          <ul>
            {detailsVideoGames.platforms?.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Details;
