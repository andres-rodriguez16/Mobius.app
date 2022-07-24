import React from 'react';
import { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames } from '../../redux/actions/action';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import spinner from '../../media/spinner.svg';
import Paginado from '../Paginado/Paginado';
import Search from '../Search/Search';
const Home = () => {
  const dispatch = useDispatch();
  const videoGames = useSelector(state => state.videoGames);

  const [actualPage, setActualPage] = useState(1);
  const [personajesPorPagina, setPersonajesPorPagina] = useState(15);
  const indeceDelUltimoPersonaje = actualPage * personajesPorPagina; //? 1 * 15 = 15
  const indeceDelPrimerPersonaje = indeceDelUltimoPersonaje - personajesPorPagina; // ? 15 - 15 = 0  
  const actualesPersonajes = videoGames.slice(indeceDelPrimerPersonaje, indeceDelUltimoPersonaje); // ? 
  

  const paginado = (numeroDePaginada) => {
     setActualPage(numeroDePaginada)
  }

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <Paginado 
       videgames={videoGames.length}
       personajesPorPagina={personajesPorPagina}
       paginado={paginado}
      />
      <Search/>
      {actualesPersonajes.length ? (
        actualesPersonajes?.map(v => {
          return (
            <div className='card' key={v.id}>
              <Link to={'/home/' + v.id} key={v.id}>
                <Card
                  name={v.name}
                  genres={v.genres}
                  image={v.img}
                  key={v.id}
                />
              </Link>
            </div>
          );
        })
      ) : 
        <div>
          <img src={spinner} alt='' />
        </div>
      }
    </div>
  );
};

export default Home;
