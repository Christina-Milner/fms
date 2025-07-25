const mongoose = require('mongoose')

const PainterSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    fullName: String,
    numOfModels: Number,
    competition: Number,
    // 0 = Out of competition, 1 = junior, 2 = figures standard, 3 = figures master, 4 = vehicles standard, 5 = vehicles master
    judged: Number,
    // 0 = not judged, 1 = first pass (new), 2 = judged
    // Entries that don't need judging won't go on the same screen anymore so don't need a N/A type option
    prizes: {
        medal: String, 
        standardBestOfShow: Boolean,
        mastersBestOfShow: Boolean,
        junBestOfShow: Boolean,
        corrr: Boolean,
        peoplesChoice: Boolean,
        sponsors: Array
    }
  })

  module.exports = mongoose.model('Painter', PainterSchema)