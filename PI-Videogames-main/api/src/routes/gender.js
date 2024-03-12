const { Router } = require("express");
const { Videogame, Gender } = require("../db");
const { API_KEY } = process.env;
const router = Router();
const axios = require('axios');
const { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND } = require('../controllers/status');



router.get('/', async(_req, res) => {
    // try {
    //     const gender = await getAllGender()
    //     res.status(SUCCES).send(gender);
    // } catch(err) {
    //     console.log(err)
    //     res.status(NOT_FOUND).send('Not info')
    // }
    try {
        const apigenders = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
        const apiGen = apigenders
        // console.log(apiGen)
        apiGen.map(async (e) => await Gender.findOrCreate({
            where: {
                id: e.id,
                name: e.name
            }
        }))
        
        const genderDb = await Gender.findAll();
        console.log('findAll')
        res.status(SUCCESS).send(genderDb);
    } catch (error) {
        console.log(error)     
        res.status(NOT_FOUND).send('Not found')   
    }
})



module.exports = router;