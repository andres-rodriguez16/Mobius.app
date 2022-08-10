
import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_POR_ID,
  GET_VIDEOGAME_POR_SEARCH,
  GET_GENRES,
  RATING_SORT,
  GAMES_SORT,
  TYPE_GENRO,
  ORDEN_BY_ALPHA,
  CLEAR_DETAILS,
  CLEAR_HOME,
  ORDEN_FECHA
} from "./actions/action"

const initialState = {
  videoGames: [],
  videoGameDetails: {},
  genres: [],
  videoGamesFilter: []
};
function ordenSort(a, b){
  if(a.name.toUpperCase() > b.name.toUpperCase()){
      return 1;
  }else if(b.name.toUpperCase() > a.name.toUpperCase()){
      return -1
  }else{
      return 0;
  }
}

function reducerVideoGames(state = initialState, action) {
  if (action.type === GET_VIDEOGAMES) {
    return {
      ...state,
      videoGames: action.payload,
      videoGamesFilter: action.payload
    }
  }
  else if (action.type === GET_VIDEOGAMES_POR_ID) {
    return {
      ...state,
      videoGameDetails: action.payload
    }
  }
  else if (action.type === GET_VIDEOGAME_POR_SEARCH) {
    if (!action.payload.error) {
      return {
        ...state, 
        videoGamesFilter: action.payload
      }
    }
    
    return{
       ...state,
    }

  } else if (action.type === GET_GENRES) {
    return {
      ...state,
      genres: action.payload
    }
  }
  else if (action.type === "Post_VideoGame"){
    return {
      ...state,
    }
  } 
  else if (action.type === GAMES_SORT) {
    let copy = [...state.videoGames].filter((g) => {
      if (action.payload === "DB") {
        return g.id.length === 36;
      } else {
        return g.id.length !== 36;
      }
    })
    return {
      ...state,
      videoGamesFilter: copy
    }
  }
  else if (action.type === RATING_SORT) {
    const ratingVideogames = [...state.videoGamesFilter];
      ratingVideogames.sort((a, b) => {
        if (a.rating < b.rating) return action.payload === "asc" ? -1 : 1;
        else if (a.rating > b.rating)
          return action.payload === "asc" ? 1 : -1;
        else return 0;
      });
      return {
        ...state,
        videoGamesFilter: ratingVideogames,
      };
  }
  else if (action.type === TYPE_GENRO) {
    const allVideoGames = state.videoGames;
    let generoFilter = action.payload === "All" ? allVideoGames : allVideoGames.filter( (el) =>{
      if (el.id.length === 36) {
          let bandera = false;
         el.Generos.forEach(g => 
             g.name === action.payload? bandera = true : null
         );
         return bandera; 
      }else{
       return el.Generos?.includes(action.payload)
      }
    })
    if (generoFilter.length === 0) {
      generoFilter = [...allVideoGames]
      alert("no se encotrataron videjuegos, con ese genero")
    }
    return {
      ...state,
      videoGamesFilter: generoFilter
    }
  }
  else if (action.type === ORDEN_BY_ALPHA ){
   const orden = [...state.videoGames]
   if (action.payload === "a-z") {
    orden.sort(ordenSort)
   }else if (action.payload === "z-a") {
    orden.sort(ordenSort).reverse()
   }
    return {
      ...state,
      videoGamesFilter: orden,
    };
  }else if(action.type === CLEAR_DETAILS){ 
    return {
      ...state,
      videoGameDetails : {}
    }
  }else if (action.type === CLEAR_HOME){
     return {
      ...state,
      videoGamesFilter : state.videoGames
    }
  }
  else if (action.type === ORDEN_FECHA){
  const ordenFecha = [...state.videoGamesFilter];
    ordenFecha.sort((a, b) => {
    if (a.released < b.released) return action.payload === "asc" ? -1 : 1;
    else if (a.released > b.released)
      return action.payload === "asc" ? 1 : -1;
    else return 0;
    })
    return{
      ...state,
      videoGamesFilter : ordenFecha
    }
  }  
  else {
    return {
      ...state
    }
  }
}

export default reducerVideoGames;