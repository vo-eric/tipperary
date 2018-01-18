let mongoose = require('mongoose');

let barSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

module.exports = mongoose.model('Bar', barSchema);
