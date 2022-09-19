import axios from "axios"

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_POR_ID = "GET_VIDEOGAMES_POR_ID";
export const GET_VIDEOGAME_POR_SEARCH = "GET_VIDEOGAME_POR_SEARCH";
export const GET_GENRES = "GET_GENRES";
export const RATING_SORT = "RATING_SORT";
export const GAMES_SORT = "GAMES_SORT";
export const TYPE_GENRO = "TYPE_GENRO";
export const ORDEN_BY_ALPHA = "ORDEN_BY_ALPHA";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const CLEAR_HOME = "CLEAR_HOME";
export const ORDEN_FECHA = "ORDEN_FECHA"


export function getVideoGames() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/videogames/`)
      dispatch({
        type: GET_VIDEOGAMES,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }

  };
};

export function getVideoGamePorId(id) {
  return async function (dispatch) {
      try {
        const response = await axios.get(`/videogame/${id}`)
        dispatch({
          type: GET_VIDEOGAMES_POR_ID,
          payload: response.data
        })
      } catch (error) {
        console.log(error); 
      }
  }
}

export function getVideoGamePorSearch(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/videogames?name=${name}`)
        if (!response.error) {
          dispatch({
            type: GET_VIDEOGAME_POR_SEARCH,
            payload: response.data
          })
        } else {
          return alert("no se encotraron resultados")
        }
    } catch (error) {
      console.log(error); 
    }
  }
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/genres/`)
        dispatch({
          type: GET_GENRES,
          payload: response.data,
        })
    } catch (error) {
      console.log(error)
    }
    
  }
}

export function postVideoGame(payload) {
  return async function () {
    const response = await axios.post(`/videogames/`, payload)
    return response;
  }
}

export function ratingSort(orden) {

  return {
    type: RATING_SORT,
    payload: orden,
  }
}
// filtro desde la base de datos y api
export function ordenPorGames(orden) {
  return {
    type: GAMES_SORT,
    payload: orden,
  }
}

export function filtroPorGenero(genero) {
  return {
    type: TYPE_GENRO,
    payload: genero
  }
}

export function filtroPorAlpha(orden) {
  return {
    type: ORDEN_BY_ALPHA,
    payload: orden
  }
}

export function clearDetails() {
  return {
    type: CLEAR_DETAILS
  }
}
export function clearHome() {
  return {
    type: CLEAR_HOME
  }
}

export function ordenFecha(orden) {
  return {
    type: ORDEN_FECHA,
    payload: orden
  }
}