const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const videogameRoute = require('./videogames')
const genderRoute = require('./gender')
const platformRoute = require('./platform')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogameRoute)
router.use('/gender', genderRoute)
router.use('/platforms', platformRoute)


module.exports = router;
