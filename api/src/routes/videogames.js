require('dotenv').config();

const { Router } = require("express")
const router = Router();
const { YOUR_API_KEY } = process.env;
const { fecthAPIGamesFinal, fecthAPIGames } = require("../utils/fecthAPIGamesget")
const { Genero, Videogame } = require("../db")


router.get("/", async (req, res) => {
  const peticion = await fecthAPIGames(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`, 5)
  let results = fecthAPIGamesFinal(peticion)
  res.json(results)
})

router.post("/", async (req, res) => {
  let { name, description, rating, platforms, genres } = req.body;
  try {
    if (!name || !description || !platforms) {
      res.status(400).send("Valid information to continue with the request")
    }
    let gameCreate = await Videogame.create({
      name,
      description,
      rating,
      platforms
    })
    let result = await Genero.findAll({
      where: {
        name: genres
      }
    })
    await gameCreate.addGenero(result);
    res.json("Ascess")
  } catch (error) {
    throw (error)
  }
})
module.exports = router;