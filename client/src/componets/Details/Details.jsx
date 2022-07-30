import React from 'react';
import { getVideoGamePorId } from '../../redux/actions/action';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams , Link} from 'react-router-dom';

const Details = () => {

  const { id } = useParams();
  const detailsVideoGames = useSelector(state => state.videoGameDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoGamePorId(id));
  }, [dispatch]);
  
  let imgDefault = "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2021/02/30-mejores-heroes-ultimos-30-anos-2243371.jpg?itok=1iWouJJI"
  return (
    <div>
      <h1>details</h1>
      <h3>{detailsVideoGames.name}</h3>
      <img src={detailsVideoGames.img? detailsVideoGames.img : imgDefault} alt='' width={300} height={200} />
      <p> Descripción: {detailsVideoGames.description}</p>
      <p>Ranting: {detailsVideoGames.rating}</p>
      <p>Fecha de lanzamiento: {detailsVideoGames.released}</p>
      <section>
        <p> Generos</p>
        <ul>
          {detailsVideoGames.genres?.map(p => (
            <li key={p}>{p}</li>
          )) || detailsVideoGames.Generos?.map(p => (
            <li key={p.id}>{p.name}</li>
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
     <Link to="/home">
      <button>Volver</button>
     </Link>
    </div>
  );
};

export default Details;
