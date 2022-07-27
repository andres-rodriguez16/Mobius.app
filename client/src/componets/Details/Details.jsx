import React from 'react';
import { getVideoGamePorId } from '../../redux/actions/action';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const detailsVideoGames = useSelector(state => state.videoGameDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoGamePorId(id));
  }, [dispatch]);

  return (
    <div>
      <h1>details</h1>
      <h3>{detailsVideoGames.name}</h3>
      <img src={detailsVideoGames.img} alt='' width={300} height={200} />
      <p> Descripción: {detailsVideoGames.description}</p>
      <p>Ranting: {detailsVideoGames.rating}</p>
      <p>Fecha de lanzamiento: {detailsVideoGames.released}</p>
      <section>
        <p> Generos</p>
        <ul>
          {detailsVideoGames.genres?.map(p => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
      <section>
        <p>Plataformas</p>
        <ul>
          {detailsVideoGames.platforms?.map(p => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
      <button>
        <a href='/home'>regresar</a>{' '}
      </button>
    </div>
  );
};

export default Details;
