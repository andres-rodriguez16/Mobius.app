require('dotenv').config();
const { Router } = require("express")
const { YOUR_API_KEY } = process.env;
const axios = require("axios")
const { Genero } = require("../db")

const router = Router();

router.get("/", async (req, res) => {
  const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
  const { results } = data;
  const genresName = results.map(g => g.name);
  const genresPending = genresName.map(async(genre) => {
    await Genero.create({ name: genre });
  });
  Promise.all(genresPending)
  .then(async () => { 
    const genresCreateds = await Genero.findAll();
    res.json(genresCreateds);
  })
  .catch( (error) => {throw(error)})
});

module.exports = router;

