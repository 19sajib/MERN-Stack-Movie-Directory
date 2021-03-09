const mongoose = require('mongoose');
const Schema = mongoose.Schema

const favoriteSchema = mongoose.Schema({
    userForm: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    movieImage: {
        type: String
    },
    movieRunTime: {
        type: String
    }
})


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }