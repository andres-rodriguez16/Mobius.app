import React from 'react';
import { getVideoGamePorId, clearDetails } from '../../redux/actions/action';
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
    return function () {
       dispatch(clearDetails())
    }
  }, [dispatch, id]);
  
  return (
    <div>
      <Link to="/home">
      <button className={s.button__volver} >Volver</button>
     </Link>
      <h3 className={s.name} >{detailsVideoGames.name}</h3>
      <img className={s.img} src={detailsVideoGames.img} alt='' />
      <p className={s.description__p}> Descripción:</p>
       <p className={s.description__text}>{detailsVideoGames.description}</p>
      <p className={s.rating}>Ranting: ★ {detailsVideoGames.rating}</p>
      <p className={s.lanzamiento} >Fecha de lanzamiento: {detailsVideoGames.released}</p>
      <section className={s.genres}>
        <p>Generos :</p>
        <ul>
          {console.log(detailsVideoGames)}
          {detailsVideoGames.Generos?.map(p => ( p.name? <li key={p.id}>{p.name}</li>
            :<li key={p}>{p}</li>
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
