import axios from "axios"

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_POR_ID = "GET_VIDEOGAMES_POR_ID";
export const GET_VIDEOGAME_POR_SEARCH = "GET_VIDEOGAME_POR_SEARCH";
export const GET_GENRES = "GET_GENRES";
export const RATING_SORT = "RATING_SORT";
export const GAMES_SORT= "GAMES_SORT";
export const TYPE_GENRO = "TYPE_GENRO";
export const ORDEN_BY_ALPHA = "ORDEN_BY_ALPHA";



export function getVideoGames() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames/`)
      .then(v => v.json())
      .then(v => {
        dispatch({
          type: GET_VIDEOGAMES,
          payload: v
        });
      })
      .catch(e => console.log(e))
  };
};

export function getVideoGamePorId(id) {
  return function (dispatch) {
    fetch(`http://localhost:3001/videogame/${id}`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: GET_VIDEOGAMES_POR_ID,
          payload: response
        })
      })
      .catch(e => console.log(e))
  }
}

export function getVideoGamePorSearch(name) {
  return function (dispatch) {
    fetch(`http://localhost:3001/videogames?name=${name}`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: GET_VIDEOGAME_POR_SEARCH,
          payload: response,
        })
      })
      .catch(alert("no se encotro resultados"))
  }
}

export function getGenres() {
  return function (dispatch) {
    fetch(`http://localhost:3001/genres/`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: GET_GENRES,
          payload: response,
        })
      })
      .catch(e => console.log(e))
  }
}

export function postVideoGame(payload){
  return async function(dispatch){
    const response = await axios.post(`http://localhost:3001/videogames/`, payload)
    return response;
  }
} 

export function ratingSort(orden){

  return {
    type : RATING_SORT,
    payload : orden,
  }
}
// filtro desde la base de datos y api
export function ordenPorGames (orden){
  return {
    type : GAMES_SORT,
    payload : orden,
  }
}

export function filtroPorGenero (genero){
  return {
    type : TYPE_GENRO,
    payload : genero
  }
}

export function filtroPorAlpha(orden){
  return {
     type : ORDEN_BY_ALPHA,
     payload : orden
  }
}