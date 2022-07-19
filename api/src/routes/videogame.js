const { Router } = require('express');
const { getGameId } = require('../utils/fecthApiGame');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/:idVi", async (req, res) => {
  try {
    const { idVi } = req.params
    console.log(parseInt(idVi))
    if (Number(idVi) === 0) throw "enter a number";
    if (parseInt(idVi) === NaN) throw "not is number, enter a number"
    const result = await getGameId(idVi)
    res.send(result)
  } catch (error) {
    res.status(404).json({ msg: error.message || error })
  }
})


module.exports = router;
