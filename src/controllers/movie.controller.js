const Movies = require('../models/movies.model');

exports.getAllMovies = async (req, res) => {
    try {
        const moviesList = await Movies.find().populate('name', 'rating');
        res.json(moviesList);
    } catch (err) {
        res.json(err);
    }
};