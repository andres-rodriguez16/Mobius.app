const { Router } = require('express');
const { getGameId } = require('../utils/busquedaPorID');
const {Genero, Videogame} = require("../db")

const router = Router();


router.get("/:idVi", async (req, res) => {

  const { idVi } = req.params;
  try {
    if (idVi.length !== 36) {
      const result = await getGameId(idVi)
      res.json(result) 
    } 
   else {
      const busquefaDB = await Videogame.findByPk(idVi,{
        include : Genero
      })
      res.send(busquefaDB)
    }
  } catch (error) {
    res.status(404).json({ msg: error.message || error })
  }
})

module.exports = router;
