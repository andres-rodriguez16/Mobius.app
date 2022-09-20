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
          if (peticionPorQuery.data.results.length < 15) {
            const menosDeQuince = datosTraidosDeLaApi(peticionPorQuery.data.results)
            res.json(menosDeQuince)
          }
          const resultsConQuince = peticionPorQuery.data.results.slice(0, 15);
          const extraerDatosNecesarios = datosTraidosDeLaApi(resultsConQuince);
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
  try {
    let { name, description, rating, platforms, genres, released, img } = req.body;
    if (!name || !description || !platforms) {
      res.status(400).send("Invalid information to continue with the request")
    }
    if (!img) img = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2021/02/30-mejores-heroes-ultimos-30-anos-2243371.jpg?itok=1iWouJJI';
    if (typeof name === "string" && typeof description === "string" && typeof rating === "number"
      && Array.isArray(platforms) && Array.isArray(genres)) {
      let gameCreate = await Videogame.create({
        name,
        description,
        rating,
        platforms,
        released,
        img
      })
      await gameCreate.addGenero(genres);
      res.json(gameCreate)
    }
  } catch (error) {
    throw (error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    await Videogame.destroy({
      where: {
        id: id
      }
    })
    res.send("Videojuego eliminado correctamente")
  } catch (error) {
    throw error
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name, rating } = req.body;
    await Videogame.update({
      name: name,
      rating: rating
    },
      {
        where: {
          id: id
        }
      })
    res.send("videogames actualizado")
  } catch (error) {
    throw error
  }
})
module.exports = router;

