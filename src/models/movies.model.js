const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({

    name: { type: String, required: true },
    rating: { type: Number },
    collection: { type: Number },
    release_date: { type: Date }
})

module.exports = mongoose.model('Movies', moviesSchema)