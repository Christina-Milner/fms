const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
    name: String,
    current: Number
  })

  module.exports = mongoose.model('Counter', CounterSchema)