const axios = require('axios');
const { API_KEY } = process.env;
const { Gender } = require('../db');

const getAllGenders = async () => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const allGenders = response.data.results;
        
        for (const genre of allGenders) {
            await Gender.findOrCreate({
                where: {
                    id: genre.id,
                    name: genre.name
                }
            });
        }

        // Obtener los géneros después de completar el async
        const genders = await Gender.findAll();
        return genders;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching all genders');
    }
};

module.exports = {
    getAllGenders
};