const mongoose = require('mongoose')

const YearSchema = new mongoose.Schema({
    year: { type: Number, unique: true },
    totalModels: Number,
    juniors: Number,
    adults: Number,
    bestOfShow: String,
    peoplesChoice: String,
    sponsors: Array,
    corrr: Number,
  })

  module.exports = mongoose.model('Year', YearSchema)