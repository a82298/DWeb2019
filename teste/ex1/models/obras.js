const mongoose = require('mongoose')
var Schema = mongoose.Schema

var ObrasSchema = new Schema({
    _id: {type: String, required:true},
    titulo: String,
    tipo: String,
    compositor: String
  });

module.exports = mongoose.model('obras', ObrasSchema)
