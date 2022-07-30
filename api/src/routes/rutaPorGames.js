require('dotenv').config();

const { Router } = require("express")
const router = Router();
const { YOUR_API_KEY } = process.env;
const { datosTraidosDeLaApi, fecthAPIGames } = require("../utils/fecthAPIGamesget")
const { Videogame, Genero } = require("../db")
const axios = require("axios")


router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const busquedaEnLaDB = await Videogame.findAll({
        where: {
          name: name
        }
      })
      if (busquedaEnLaDB.length) {
        res.json(busquedaEnLaDB)
      } else {
        const peticionPorQuery = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);
        if (peticionPorQuery.data.results.length) {
          const resultsConQuince = peticionPorQuery.data.results.slice(0, 15);
          const extraerDatosNecesarios = datosTraidosDeLaApi(resultsConQuince)
          res.json(extraerDatosNecesarios);
        } else {
          res.status(404).json({ error: "Videojuego no encontrado" })
        }
      }
    } else {
      const peticion = await fecthAPIGames(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`, 5);
      const peticionDB = await Videogame.findAll({
        include: {
          model: Genero,
          through: {
            attributes:
              [],
          }
        }
      });
      let results = datosTraidosDeLaApi(peticion);
      const allGames = [...results, ...peticionDB]
      res.json(allGames);
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }

})

router.post("/", async (req, res) => {

  let { name, description, rating, platforms, genres, released } = req.body;
  if (!name || !description || !platforms) {
    
    res.status(400).send("Invalid information to continue with the request")
  }
  try {
    if (typeof name === "string" && typeof description === "string" && typeof rating === "number"
      && Array.isArray(platforms) && Array.isArray(genres)) {
      let gameCreate = await Videogame.create({
        name,
        description,
        rating,
        platforms,
        released,

      })
    
      await gameCreate.addGenero(genres);
      res.json(gameCreate)
    }
  } catch (error) {
    throw (error)
  }

})
module.exports = router;