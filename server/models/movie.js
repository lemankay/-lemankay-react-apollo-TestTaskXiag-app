const { model, Schema } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    yes: String,
    no: String,
    date: Number, 
    username: String
})

module.exports = model("Movie", movieSchema);