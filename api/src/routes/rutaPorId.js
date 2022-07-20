const { Router } = require('express');
const { getGameId } = require('../utils/busquedaPorID');
const {Genero, Videogame} = require("../db")

const router = Router();


router.get("/:idVi", async (req, res) => {

  const { idVi } = req.params;
  try {
    let id = Number(idVi);
    if (id) {
      const result = await getGameId(idVi)
      res.json(result) 
    } else {
      const busquefaDB = await Videogame.findByPk(idVi,{
        include : {
          model: Genero,
          through : {attributes: []},
        }
      })
      res.send("funciona")
    }
  } catch (error) {
    res.status(404).json({ msg: error.message || error })
  }
})

module.exports = router;
