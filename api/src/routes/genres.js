require('dotenv').config();
const { Router } = require("express")
const { Genero } = require("../db")
const router = Router();

router.get("/", async (req, res) => {
  try {
    let encotrarGeneros = await Genero.findAll()
    res.send(encotrarGeneros)
  } catch (error) {
    res.json({message: error })
  }
});

module.exports = router;

