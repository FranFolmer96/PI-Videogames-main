const axios = require('axios');
const { API_KEY } = process.env;
const { Gender } = require('../db');

const getAllGenders = async () => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const allGenders = response.data.results;
        allGenders.forEach(async (genre) => {
            await Gender.findOrCreate({
                where: {
                    id: genre.id,
                    name: genre.name
                }
            });
        });
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
