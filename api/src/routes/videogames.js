require('dotenv').config();

const { Router } = require("express")
const router = Router();
const { YOUR_API_KEY } = process.env;
const {fecthAPIGamesFinal, fecthAPIGames} = require("../utils/fecthAPIGamesget")


router.get("/",  async (req, res) => {
  const peticion = await fecthAPIGames(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`, 5)
  let results = fecthAPIGamesFinal(peticion)
  console.log(results.length)
  res.json(results)
}) 

module.exports = router;