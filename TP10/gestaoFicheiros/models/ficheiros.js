const mongoose = require('mongoose')

var ficheiroShcema = new mongoose.Schema({
    data: String,
    desc: String,
    name: String,
    mimetype: String,
    size: Number
})

module.exports = mongoose.model('ficheiro',ficheiroShcema)