const mongoose = require('mongoose')

var Person = new mongoose.Schema({
    _id: {type: Number, required: true},
    firstname : String,
    surname : String,
    motivation: String,
    share : Number
})

var nobelSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    year: {type: Number, required: true},
    category: {type: String, required: true},
    overallMotivation: String,
    laureates: [Person]
  });

module.exports = mongoose.model('prizes', nobelSchema)