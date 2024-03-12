const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Gender, Platform } = require('../db');

const getApiInfo = async () => {
    try {
        const totalPages = [];
        let nextPage = `https://api.rawg.io/api/games?key=${API_KEY}`;

        while (nextPage) {
            const response = await axios.get(nextPage);
            const { results, next } = response.data;
            totalPages.push(...results);
            nextPage = next;
        }

        const apiData = totalPages.map(game => ({
            id: game.id,
            name: game.name,
            image: game.background_image,
            genders: game.genres.map(g => g.name),
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map(p => p.platform.name),
            reviews_text_count: game.reviews_text_count
        }));

        return apiData;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching data from RAWG API');
    }
};

const getDbInfo = async () => {
    try {
        const dbInfo = await Videogame.findAll({
            include: [
                {
                    model: Gender,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: Platform,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            ],
        });
        return dbInfo;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching data from the database');
    }
};

const getAllInfo = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const allInfo = apiInfo.concat(dbInfo);
        return allInfo;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching all info');
    }
};

const getId = async (id) => {
    try {
        if (id.match(/^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$/i)) {
            const dbID = await Videogame.findByPk(id, {
                include: [
                    {
                        model: Gender,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Platform,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                ],
                attributes: ['id', 'name', 'description', 'released', 'rating', 'image', 'createdInDb']
            });
            return dbID;
        } else {
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const game = {
                id: response.data.id,
                name: response.data.name,
                released: response.data.released,
                rating: response.data.rating,
                platforms: response.data.parent_platforms.map(p => p.platform.name),
                image: response.data.background_image,
                genders: response.data.genres.map(g => g.name),
                description: response.data.description
            };
            return game;
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching game by ID');
    }
};

module.exports = {
    getAllInfo,
    getDbInfo,
    getApiInfo,
    getId
};
