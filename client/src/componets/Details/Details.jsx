import React from 'react';
import { getVideoGamePorId } from '../../redux/actions/action';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams , Link} from 'react-router-dom';
import s from "./Details.module.css"

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
      <Link to="/home">
      <button className={s.button__volver} >Volver</button>
     </Link>
      <h3 className={s.name} >{detailsVideoGames.name}</h3>
      <img className={s.img} src={detailsVideoGames.img? detailsVideoGames.img : imgDefault} alt='' />
      <p className={s.description} > Descripción: {detailsVideoGames.description}</p>
      <p className={s.rating}>Ranting: {detailsVideoGames.rating}</p>
      <p className={s.lanzamiento} >Fecha de lanzamiento: {detailsVideoGames.released}</p>
      <section  className={s.genres}>
        <p>Generos :</p>
        <ul>
          {detailsVideoGames.genres? detailsVideoGames.genres?.map(p => (
            <li key={p}>{p}</li>
          )) : detailsVideoGames.Generos?.map(p => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </section>
      <section  className={s.platforms}>
        <p>Plataformas : </p>
        <ul>
          {detailsVideoGames.platforms?.map(p => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Details;
