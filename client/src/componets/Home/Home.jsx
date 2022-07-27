import React from 'react';
import { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, getGenres, ordenPorGames, filtroPorGenero , ratingSort, filtroPorAlpha} from '../../redux/actions/action';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import spinner from '../../media/spinner.svg';
import Paginado from '../Paginado/Paginado';
import Search from '../Search/Search';



const Home = () => {
  const dispatch = useDispatch();
  const videoGames = useSelector(state => state.videoGamesFilter);
  const genres = useSelector(state => state.genres)
  const [actualPage, setActualPage] = useState(1);
  const [videogamesPorPagina, setvideogamesPorPagina] = useState(15);
  const indeceDelUltimoVideogame = actualPage * videogamesPorPagina; //? 1 * 15 = 15
  const indeceDelPrimerVideogame = indeceDelUltimoVideogame - videogamesPorPagina; // ? 15 - 15 = 0  
  const actualesVideogames = videoGames.slice(indeceDelPrimerVideogame, indeceDelUltimoVideogame); // ? 
  

  const paginado = (numeroDePaginada) => {
    setActualPage(numeroDePaginada)
  }

  useEffect(() => {
    dispatch(getVideoGames());
   dispatch(getGenres())
  }, [dispatch]);

  // useEffect(()=>{
  //   dispatch(getGenres())
  // }, [])  

function handleOnGames (e){
   dispatch(ordenPorGames(e.target.value))
}

function handleFiltroPorGenro (e){
  dispatch(filtroPorGenero(e.target.value))
}

function handleFiltroPorRating(e) {
  dispatch(ratingSort(e.target.value))
}
function handleFiltroPorAlpha (e){
  dispatch(filtroPorAlpha(e.target.value))
}
  return (
    <div>

      <h1>Home</h1>
      <div>
        <select onChange={(e) => handleFiltroPorRating(e)}>
          <option>Rating</option>
          <option value='asc'>Ascendente</option>
          <option value='desc'>Decendente</option>
        </select>
        <select onChange={(e) => handleFiltroPorAlpha(e)}>
          <option value="ordenAlpha">Alpha</option>
          <option value='a-z'>A-Z</option>
          <option value='z-a'>Z-A</option>
        </select>
        <select onChange={(e) => handleOnGames(e)}>
          <option>orden</option>
          <option value="DB">Creados</option>
          <option value="Api">Api</option>
        </select>
        <select name='Genros' onChange={(e) => handleFiltroPorGenro(e)}>
          <option value="All">Todos</option>
        {genres.length ? genres.map(g => {
           return (
             <option value={g.name} key={g.id} >{g.name}</option>
           )
        }): []} 
        </select>
      </div>
      <Paginado 
       videgames={videoGames.length}
       videogamesPorPagina={videogamesPorPagina}
       paginado={paginado}
      />
      <Search setActualPage={setActualPage} />
      {actualesVideogames.length ? (
        actualesVideogames?.map(v => {
          return (
            <div className='card' key={v.id}>
              <Link to={'/home/' + v.id} key={v.id}>
                <Card
                  name={v.name}
                  genres={v.genres}
                  image={v.img}
                  key={v.id}
                  rating={v.rating}
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
